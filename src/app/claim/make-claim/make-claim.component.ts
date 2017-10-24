import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileValidators } from "../../shared/file-input/file-validators";
import { FileInput } from "../../shared/file-input/file-input.model";
import { AngularFireAuth } from 'angularfire2/auth';
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

  damageTypes = [
    { value: 1, label: 'Accidental Damage' },
    { value: 2, label: 'Theft' },
    { value: 3, label: 'Burglary' },
    { value: 4, label: 'Robbery' },
    { value: 5, label: 'Liquid Damage' },
  ]

  uploadProgress = {
    idProof : 0,
    invoice : 0,
    fir : 0,
    expenseReciept : 0,
    hospitalReport : 0,
    devicePhotos : [],
    entityPhotos : []
  }

  constructor(
    public dialogRef: MatDialogRef<MakeClaimComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
    public angularFire: AngularFireAuth) { }

  ngOnInit() {


    this.basicFormGroup = this._formBuilder.group({
      insurance_ref: [{ value: this.data.ref_no, disabled: true }, [Validators.required]],
      damage_type: ['', [Validators.required]],
      claim_amount: ['', [Validators.max(this.data.coverage), Validators.required]],

    });

    this.documentFormGroup = this._formBuilder.group({
      id_proof: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]],
      invoice: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]],
      fir: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]],
      expense_reciept: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]],
      hospital_report: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['pdf', 'docx'])]],
      device_photos: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['png', 'jpeg'])]],
      entity_photos: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType(['png', 'jpeg'])]],

    });

    this.videoFormGroup = this._formBuilder.group({
      video_proof: [{ value: undefined, disabled: true }, [Validators.required]],

    });

    // this.videoFormGroup.get('video_proof').setValue()

  }

  createDocumentFormGroup() {

  }

  onRecordComplete(videBlob){
    console.log(videBlob)
  }

  makeClaimRequest(){
    this.uploadDocuments('id_proof', 'idProof');
    this.uploadDocuments('invoice', 'invoice');
    this.uploadDocuments('fir', 'fir');
    this.uploadDocuments('expense_reciept', 'expenseReciept');
    this.uploadDocuments('hospital_report', 'hospitalReport');
  }

  uploadDocuments(field, progressKey){
    let file1 = this.documentFormGroup.get(field).value as FileInput;
    let path = 'claim/' + field + '/' +  file1.files[0].name;
    let storageRef = firebase.storage().ref().root.child(path);
    let uploadTask = storageRef.put(file1.files[0])

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        this.uploadProgress[progressKey] = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        console.log(uploadTask.snapshot.downloadURL)
        
      }
    );
    
    storageRef.put(file1.files[0]).then(function(){
      console.log('completed')
    }, function(){
      console.log('error')
    })
  }

}
