import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FileValidators } from "../../shared/file-input/file-validators";
import { FileInput } from "../../shared/file-input/file-input.model";
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Rx";
import * as moment from "moment";
import 'firebase/storage';
import * as firebase from 'firebase/app';
import { APIUrls, AppLabels } from "../../app-config";
import { AjaxService } from "../../shared";
import { AppConfigService } from "../../core/app-config.service";

@Component({
  selector: 'app-make-claim',
  templateUrl: './make-claim.component.html',
  styleUrls: ['./make-claim.component.css']
})
export class MakeClaimComponent implements OnInit {

  recordedBlob: any;
  appLabel = AppLabels;
  loading = false;
  claimReason: any;

  basicFormGroup: FormGroup;
  documentFormGroup: FormGroup;
  videoFormGroup: FormGroup;
  claimReasonSelected: boolean = false;
  selectedReason: number;
  tasks: Array<Promise<any>> = [];

  public submitting: boolean = false;
  public uploading: boolean = false;


  claimMainReason = [];

  claimReasonGrouped = {};



  uploadProgress = {
    idProof: 0,
    invoice: 0,
    fir: 0,
    expenseReciept: 0,
    hospitalReport: 0,
    devicePhotos: [],
    entityPhotos: [],
    videoProof: 0
  }


  constructor(
    public dialogRef: MatDialogRef<MakeClaimComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
    public angularFire: AngularFireAuth, private ajaxService: AjaxService,
    private router: Router, private appConfigService: AppConfigService) {
      this.claimReason = appConfigService.claimReason;
    }

  extractClaimReason(data) {

    let claimMainReasonDict = {}
    if (data.Details) {
      for (let item of data.Details) {
        if (this.claimReasonGrouped[item.Issue_Id])
          this.claimReasonGrouped[item.Issue_Id].push({ value: {id: item.IssueSub_Id, code: item.IssueSub_Code }, label: item.IssueSub_Name });
        else
          this.claimReasonGrouped[item.Issue_Id] = [{ value: {id: item.IssueSub_Id, code: item.IssueSub_Code }, label: item.IssueSub_Name }];
        claimMainReasonDict[item.Issue_Id] = { label: item.Issue_Name, code: item.Issue_Code };
      }
      Object.keys(claimMainReasonDict).forEach(key => {
        this.claimMainReason.push({ value: {id : key, code: claimMainReasonDict[key].code}, label: claimMainReasonDict[key].label })
      })
    }
    
  }

  ngOnInit() {

    this.loading = true;
    this.ajaxService.execute({ url: APIUrls.claimReason, method: 'POST' })
      .subscribe(success => {
        this.extractClaimReason(success);
        this.loading = false;
      }, error => {
        let success = {
          "Status": "SUCCESS",
          "Message": "What happened to your device?",
          "Details": [
            {
              "Issue_Id": 1,
              "Issue_Name": "Damage",
              "Issue_Code": "DMG",
              "IssueSub_Id": 8,
              "IssueSub_Code": 'ACDMG',
              "IssueSub_Name": "Accidental Damage",
              "IssueSub_FirstMessage": null,
              "IssueSub_SecondMessage": null,
              "IssueSub_ClaimPercentage": 2
            },
            {
              "Issue_Id": 1,
              "Issue_Name": "Damage",
              "Issue_Code": "DMG",
              "IssueSub_Id": 9,
              "IssueSub_Code": 'LQDMG',
              "IssueSub_Name": "Liquid Damage",
              "IssueSub_FirstMessage": null,
              "IssueSub_SecondMessage": null,
              "IssueSub_ClaimPercentage": 3
            },
            {
              "Issue_Id": 2,
              "Issue_Name": "Lost",
              "Issue_Code": "LST",
              "IssueSub_Id": 10,
              "IssueSub_Code": 'TFT',
              "IssueSub_Name": "Theft",
              "IssueSub_FirstMessage": null,
              "IssueSub_SecondMessage": null,
              "IssueSub_ClaimPercentage": 4
            },
            {
              "Issue_Id": 2,
              "Issue_Name": "Lost",
              "Issue_Code": "LST",
              "IssueSub_Id": 11,
              "IssueSub_Code": 'BRG',
              "IssueSub_Name": "Burglary",
              "IssueSub_FirstMessage": null,
              "IssueSub_SecondMessage": null,
              "IssueSub_ClaimPercentage": 3
            },
            {
              "Issue_Id": 2,
              "Issue_Name": "Lost",
              "Issue_Code": "LST",
              "IssueSub_Id": 12,
              "IssueSub_Code": 'ROB',
              "IssueSub_Name": "Robbery",
              "IssueSub_FirstMessage": null,
              "IssueSub_SecondMessage": null,
              "IssueSub_ClaimPercentage": 2
            }
          ]
        }
        this.extractClaimReason(success);
        this.loading = false;
      })
    this.basicFormGroup = this._formBuilder.group({
      insuranceRef: [{ value: this.data.Insurance_Id, disabled: true }, [Validators.required]],
      claimReason: ['', [Validators.required]],
      exactReason: ['', [Validators.required]],

    });


    this.documentFormGroup = this._formBuilder.group({
      // idProof: [{ value: undefined, disabled: false }, [Validators.required,
      // FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]],
      // invoice: [{ value: undefined, disabled: false }, [Validators.required,
      // FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]],

      // should we add expense reciept ?
      expenseReciept: [{ value: undefined, disabled: false }, [Validators.required,
      FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]],
    });

    this.videoFormGroup = this._formBuilder.group({
      isVideoProofSubmitted: ['', [Validators.required]],

    });



    this.basicFormGroup.get('claimReason').valueChanges.subscribe((value) => {
      this.selectedReason = value.id;
      this.claimReasonSelected = true;
      if (value.code == this.claimReason.LOST) { // If Lost add police fir
        let fir = new FormControl({ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]);
        this.documentFormGroup.addControl('fir', fir);
        this.documentFormGroup.removeControl('devicePhotos');
      } else if(value.code == this.claimReason.DAMAGE) { // If damage add device photos  
        let devicePhotos = new FormControl({ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['png', 'jpeg'])]);
        this.documentFormGroup.addControl('devicePhotos', devicePhotos);
        this.documentFormGroup.removeControl('fir');
      }
    })

    this.basicFormGroup.get('exactReason').valueChanges.subscribe((value) => {
      console.log(value)
      if (value.code == this.claimReason.ROBBERY) {  // If Robery add hospital report 
        let hospitalReport = new FormControl({ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]);
        this.documentFormGroup.removeControl('entityPhotos');
        this.documentFormGroup.addControl('hospitalReport', hospitalReport);

      } else if (value.code == this.claimReason.BURGLARY) { // If Burglary add entity(car/home) photos 
        let entityPhotos = new FormControl({ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['png', 'jpeg'])]);
        this.documentFormGroup.removeControl('hospitalReport');
        this.documentFormGroup.addControl('entityPhotos', entityPhotos);
      }
      else {
        this.documentFormGroup.removeControl('hospitalReport');
        this.documentFormGroup.removeControl('entityPhotos');
      }
    })

  }


  checkVideo() {
    if (this.videoFormGroup.get('isVideoProofSubmitted').invalid) {
      alert('Video record is mandatory')
    }
  }

  checkDocumets() {
    let fields = [
      // 'idProof', 'invoice', 
      'expenseReciept', 'fir', 'devicePhotos', 'hospitalReport', 'entityPhotos']
    for (let field of fields) {
      if (this.documentFormGroup.get(field)) {
        this.documentFormGroup.get(field).markAsTouched();
        this.documentFormGroup.get(field).updateValueAndValidity();
      }
    }

  }

  onRecordComplete(videBlob) {
    console.log(videBlob)
    this.recordedBlob = videBlob;
    this.videoFormGroup.get('isVideoProofSubmitted').setValue(true)
  }

  uploadVideo() {
    let blob = this.recordedBlob
    let path = 'claim/' + this.data.ref_no + '/' + 'video' + '/' + 'video.webm';
    let storageRef = firebase.storage().ref().root.child(path);
    let uploadTask = storageRef.put(blob);
    this.tasks.push(new Promise((resolve, reject) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {

          this.uploadProgress['videoProof'] = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        }, (error) => {
          // upload failed
          reject(error)
        }, () => {
          // upload success
          resolve({ name: 'videoProof', url: uploadTask.snapshot.downloadURL })
        }
      );
    }))
  }

  makeClaimRequest() {
    this.uploading = true;
    this.tasks = []
    // this.extractAndTriggerUpload('idProof');
    // this.extractAndTriggerUpload('invoice');
    this.extractAndTriggerUpload('fir');
    this.extractAndTriggerUpload('expenseReciept');
    this.extractAndTriggerUpload('hospitalReport');
    this.extractAndTriggerUpload('devicePhotos', true);
    this.extractAndTriggerUpload('entityPhotos', true);
    // this.uploadVideo();
    Promise.all(this.tasks).then((files) => {
      console.log(files)
      this.submitDataToServer(files)
    })
  }



  submitDataToServer(files) {
    this.submitting = true;
    let fileDict = {
      devicePhotos: [],
      entityPhotos: []
    }
    files.forEach(file => {
      if (file.name == 'devicePhotos' || file.name == 'entityPhotos')
        fileDict[file.name].push(file.url)
      else
        fileDict[file.name] = file.url
    });

    let dataToServer = Object.assign(fileDict, {
      'issue_id': this.basicFormGroup.value.exactReason.id,
      'insurance_id': this.data.ref_no,
      'claimDay': moment().date(),
      'claimMonth': moment().month(),
      'claimYear': moment().year(),
      'date_of_claim': moment().format('MM/DD/YYYY'),
      'user_id': 1,
      'ref_no': 'CLAIM#1', // to be removed
      'status': 0, // to be removed
    });
    console.log(dataToServer);
    this.ajaxService.execute({ url: APIUrls.addnewClaim, method: 'post', body: dataToServer })
      .subscribe(data => {
        console.log('Data from server', data);
        this.dialogRef.close(true);
        this.router.navigate(['my-claims']);
      })
  }

  extractAndTriggerUpload(field, multiple = false) {
    if (!this.documentFormGroup.get(field)) return;
    let input = this.documentFormGroup.get(field).value as FileInput;
    if (!input) return;
    if (multiple) {
      this.uploadProgress[field] = []
      let index = 0;
      for (let file of input.files) {
        this.uploadProgress[field].push(0);
        this.tasks.push(this.uploadFile(field, file, index));
        index++;
      }
    } else {
      let file = input.files[0];
      this.tasks.push(this.uploadFile(field, file));
    }
  }

  uploadFile(field, file, index = -1) {
    let path = 'claim/' + this.data.ref_no + '/' + field + '/' + file.name;
    let storageRef = firebase.storage().ref().root.child(path);
    let uploadTask = storageRef.put(file);
    return new Promise((resolve, reject) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          if (index != -1)
            this.uploadProgress[field][index] = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
          else
            this.uploadProgress[field] = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        }, (error) => {
          // upload failed
          reject(error)
        }, () => {
          // upload success
          resolve({ name: field, url: uploadTask.snapshot.downloadURL })
        }
      );
    })
  }

  isUpLoading(field: string, index?: number) {
    let value = index ? (this.uploadProgress[field].length > index ? this.uploadProgress[field][index] : 0)
      : this.uploadProgress[field]
    return (value < 100 && value > 0)
  }

  isUploadingCompleted(field: string, index?: number) {
    let value = index ? (this.uploadProgress[field].length > index ? this.uploadProgress[field][index] : 0)
      : this.uploadProgress[field]
    return (value == 100)
  }

  getFileName(field: string, index: number = 0) {
    if (this.documentFormGroup.get(field) && this.documentFormGroup.get(field).value) {
      return (this.documentFormGroup.get(field).value as FileInput).files[index].name
    }
    return field.toUpperCase()
  }

  getFileList(field: string) {
    if (this.documentFormGroup.get(field) && this.documentFormGroup.get(field).value) {
      return (this.documentFormGroup.get(field).value as FileInput).files
    }
    return []
  }

}
