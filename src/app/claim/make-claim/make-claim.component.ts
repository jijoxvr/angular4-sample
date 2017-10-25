import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FileValidators } from "../../shared/file-input/file-validators";
import { FileInput } from "../../shared/file-input/file-input.model";
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Rx";
import * as moment from "moment";
import 'firebase/storage';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-make-claim',
  templateUrl: './make-claim.component.html',
  styleUrls: ['./make-claim.component.css']
})
export class MakeClaimComponent implements OnInit {

  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;

  basicFormGroup: FormGroup;
  documentFormGroup: FormGroup;
  videoFormGroup: FormGroup;
  claimReasonSelected: boolean = false;
  selectedReason: number;
  tasks: Array<Promise<any>> = [];


  claimReason = [
    { value: 1, label: 'Damage' },
    { value: 2, label: 'Lost' },
  ]

  exactReason = {
    2: [
      { value: 2, label: 'Theft' },
      { value: 3, label: 'Burglary' },
      { value: 4, label: 'Robbery' },
    ],
    1: [
      { value: 1, label: 'Accidental Damage' },
      { value: 5, label: 'Liquid Damage' },
    ]
  }


  uploadProgress = {
    idProof: 0,
    invoice: 0,
    fir: 0,
    expenseReciept: 0,
    hospitalReport: 0,
    devicePhotos: [],
    entityPhotos: []
  }

  constructor(
    public dialogRef: MatDialogRef<MakeClaimComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
    public angularFire: AngularFireAuth) { }

  ngOnInit() {


    this.basicFormGroup = this._formBuilder.group({
      insuranceRef: [{ value: this.data.ref_no, disabled: true }, [Validators.required]],
      claimReason: ['', [Validators.required]],
      exactReason: ['', [Validators.required]],

    });


    this.documentFormGroup = this._formBuilder.group({
      idProof: [{ value: undefined, disabled: false }, [Validators.required,
      FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]],
      invoice: [{ value: undefined, disabled: false }, [Validators.required,
      FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]],

      // should we add expense reciept ?
      expenseReciept: [{ value: undefined, disabled: false }, [Validators.required,
      FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]],
    });

    this.videoFormGroup = this._formBuilder.group({
      videoProof: [{ value: undefined, disabled: true }, [Validators.required]],

    });

    this.basicFormGroup.get('claimReason').valueChanges.subscribe((value) => {
      this.selectedReason = value;
      this.claimReasonSelected = true;
      if (value == 2) { // If Lost add police fir
        let fir = new FormControl({ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]);
        this.documentFormGroup.addControl('fir', fir);
        this.documentFormGroup.removeControl('devicePhotos');
      } else { // If damage add device photos  
        let devicePhotos = new FormControl({ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['png', 'jpeg'])]);
        this.documentFormGroup.addControl('devicePhotos', devicePhotos);
        this.documentFormGroup.removeControl('fir');
      }
    })

    this.basicFormGroup.get('exactReason').valueChanges.subscribe((value) => {
      if (value == 4) {  // If Robery add hospital report 
        let hospitalReport = new FormControl({ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]);
        this.documentFormGroup.removeControl('entityPhotos');
        this.documentFormGroup.addControl('hospitalReport', hospitalReport);

      } else if (value == 3) { // If Burglary add entity(car/home) photos 
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


  createDocumentFormGroup() {

  }

  onRecordComplete(videBlob) {
    console.log(videBlob)
  }

  makeClaimRequest() {
    this.tasks = []
    this.extractAndTriggerUpload('idProof');
    this.extractAndTriggerUpload('invoice');
    this.extractAndTriggerUpload('fir');
    this.extractAndTriggerUpload('expenseReciept');
    this.extractAndTriggerUpload('hospitalReport');
    this.extractAndTriggerUpload('devicePhotos', true);
    this.extractAndTriggerUpload('entityPhotos', true);
    Promise.all(this.tasks).then((files) => {
      console.log(files)
      this.submitDataToServer(files)
    })
  }

  submitDataToServer(files) {
    let fileDict = {}
    files.forEach(file => {
      fileDict[file.name] = file.url
    });

    let dataToServer = Object.assign(fileDict, {
      'issueId': this.basicFormGroup.value.claimReason,
      'insuranceId': this.data.ref_no,
      'claimDay': moment().date(),
      'claimMonth': moment().month(),
      'yearMonth': moment().year()
    });
    console.log(dataToServer);
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
    let path = 'claim/' + field + '/' + file.name;
    let storageRef = firebase.storage().ref().root.child(path);
    let uploadTask = storageRef.put(file);
    return new Promise((resolve, reject) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          if (index != -1)
            this.uploadProgress[field][index] = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
          else
            this.uploadProgress[field] = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        },(error) => {
          // upload failed
          reject(error)
        },() => {
          // upload success
          resolve({ name: field, url: uploadTask.snapshot.downloadURL })
        }
      );
    })
  }

}
