import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { 
  UserProfileCompleteComponent
 } from "../user-profile-complete/user-profile-complete.component";
 import {
  AbstractControl, FormBuilder,
  FormGroup, Validators, FormControl
} from '@angular/forms';

import { userProfileUpdateConfig } from "../user-profile-complete/user-profile-complete-config";
import { AppLabels } from "../../app-config";
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  updateProfileDialogRef: MatDialogRef<any> | null;

  userFormGroup: FormGroup;
  appLabel = AppLabels;
  notEditing = true;
  userData: any = {};
  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder) {
    this.user();
  }

  ngOnInit() { 
    this.userFormGroup = this._formBuilder.group({
      UserId: [{ value: this.userData.UserId}],
      DOB: [, []],
      Email: [{value: this.userData.Email}, [Validators.pattern(EMAIL_REGEX)]],
      FirstName: [{value: this.userData.FirstName}, []],
      LastName: [{value: this.userData.LastName}, []],
      MiddleName: [{value: this.userData.MiddleName}, []],
      Users_PhoneNumber: [{value: this.userData.MiddleName}],
      Users_Passport: [{value: this.userData.Users_Passport}],
      Users_KTP: [{value: this.userData.Users_KTP}]
    });

  }

  user(user?) {
    if (localStorage.getItem('userData') || user) {
      let data = user ? user : JSON.parse(localStorage.getItem('userData'));
      this.userData = data;
    }
    else {
    }
  }

  updateProfile(){
    this.notEditing = false;
    // userProfileUpdateConfig.data = this.userData;
    // this.updateProfileDialogRef = this.dialog.open(UserProfileCompleteComponent, userProfileUpdateConfig);
    // this.updateProfileDialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.user(result);
    //   }
    // })
  }

}
