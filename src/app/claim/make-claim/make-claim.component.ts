import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileValidators } from "../../shared/file-input/file-validators";


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

  constructor(
    public dialogRef: MatDialogRef<MakeClaimComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder) { }

  ngOnInit() {


    this.basicFormGroup = this._formBuilder.group({
      insurance_ref: [{ value: this.data.ref_no, disabled: true }, [Validators.required]],
      damage_type: ['', [Validators.required]],
      claim_amount: ['', [Validators.max(this.data.coverage), Validators.required]],

    });

    this.documentFormGroup = this._formBuilder.group({
      id_proof: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType('application/zip')]],
      invoice: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType('application/zip')]],
      fir: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType('application/zip')]],
      expense_reciept: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType('application/zip')]],
      hospital_report: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType('application/zip')]],
      device_photos: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType('application/zip')]],
      entity_photos: [{ value: undefined, disabled: false }, [Validators.required,
        FileValidators.maxContentSize(104857600), FileValidators.fileType('application/zip')]],

    });

  }

  createDocumentFormGroup() {

  }

}
