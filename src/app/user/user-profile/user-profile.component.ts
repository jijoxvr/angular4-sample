import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { 
  UserProfileCompleteComponent
} from "../user-profile-complete/user-profile-complete.component";
import {
  AbstractControl, FormBuilder,
  FormGroup, Validators, FormControl
} from '@angular/forms';

import { AjaxService } from "../../shared"
import * as moment from "moment";
import { userProfileUpdateConfig } from "../user-profile-complete/user-profile-complete-config";
import { AppLabels, APIUrls } from "../../app-config";
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
  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, 
    private ajaxService:AjaxService) {
      this.user();
    }
    
    ngOnInit() { 
      console.log(this.userData.Email)
      this.userFormGroup = this._formBuilder.group({
        UserId: [this.userData.UserId],
        DOB: [this.userData.BirthDate, []],
        Email: [this.userData.Email ? this.userData.Email : '', [Validators.pattern(EMAIL_REGEX)]],
        FirstName: [this.userData.FirstName ? this.userData.FirstName : '', []],
        LastName: [this.userData.LastName ? this.userData.LastName : '', []],
        MiddleName: [this.userData.MiddleName ? this.userData.MiddleName : '', []],
        Users_PhoneNumber: [this.userData.Users_PhoneNumber ? this.userData.Users_PhoneNumber : ''],
        Users_Passport: [this.userData.Users_Passport ? this.userData.Users_Passport : ''],
        Users_KTP: [this.userData.Users_KTP ? this.userData.Users_KTP : '']
      });
      
    }
    
    user(user?) {
      if (localStorage.getItem('userData') || user) {
        let data = user ? user : JSON.parse(localStorage.getItem('userData'));
        this.userData = data;
        this.userData.BirthDateFormated = this.userData.BirthDate ? 
        moment(this.userData.BirthDate).format('DD/MM/YYYY') : "";
      }
      else {
      }
    }
    
    triggerProfileUpdate(){
      this.notEditing = false;
      // userProfileUpdateConfig.data = this.userData;
      // this.updateProfileDialogRef = this.dialog.open(UserProfileCompleteComponent, userProfileUpdateConfig);
      // this.updateProfileDialogRef.afterClosed().subscribe((result) => {
      //   if (result) {
      //     this.user(result);
      //   }
      // })
    }
    
    submitProfileUpdate(){
      let BirthDay,BirthMonth,BirthYear;
      if(this.userFormGroup.get('DOB').value){
        let date = moment(this.userFormGroup.get('DOB').value);
        BirthDay = date.date()
        BirthMonth = date.month()
        BirthYear = date.year()
      }
      let dataToServer = {
        UserId : this.userData.UserId,
        BirthDay : BirthDay,
        BirthMonth : BirthMonth,
        BirthYear : BirthYear,
        Email : this.userFormGroup.get('Email').value,
        Users_PhoneNumber : this.userFormGroup.get('Users_PhoneNumber').value,
        Users_Passport : this.userFormGroup.get('Users_Passport').value,
        Users_KTP : this.userFormGroup.get('Users_KTP').value
      }
      console.log(dataToServer)
      this.ajaxService.execute({url: APIUrls.updateProfile, body: dataToServer})
      .subscribe(response=>{
        console.log(response)
      })
    }
  }
  