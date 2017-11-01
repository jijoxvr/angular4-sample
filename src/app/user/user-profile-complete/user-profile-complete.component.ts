import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import {
  MatDialog, MatDialogConfig,
  MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material';
import {
  AbstractControl, FormBuilder,
  FormGroup, Validators, FormControl
} from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Rx";
import * as moment from "moment";

import {APIUrls, AppLabels, AppConfig} from '../../app-config';
import { AjaxService } from "../../shared";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user-profile-complete',
  templateUrl: './user-profile-complete.component.html',
  styleUrls: ['./user-profile-complete.component.css']
})
export class UserProfileCompleteComponent implements OnInit {

  userFormGroup: FormGroup;
  appLabel = AppLabels;

  constructor(public dialogRef: MatDialogRef<UserProfileCompleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder,
    public angularFire: AngularFireAuth, private ajaxService: AjaxService,
    private router: Router) { }

  ngOnInit() {
    this.userFormGroup = this._formBuilder.group({
      UserId: [{ value: this.data.UserId}],
      DOB: [, []],
      Email: [{value: this.data.Email}, [Validators.pattern(EMAIL_REGEX)]],
      FirstName: [{value: this.data.FirstName}, []],
      LastName: [{value: this.data.LastName}, []],
      MiddleName: [{value: this.data.MiddleName}, []],
      Users_PhoneNumber: [{value: this.data.MiddleName}],
      Users_Passport: [{value: this.data.Users_Passport}],
      Users_KTP: [{value: this.data.Users_KTP}]
    });
  
  }

}
