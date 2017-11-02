import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { 
  UserProfileCompleteComponent
} from "../user-profile-complete/user-profile-complete.component";
import {
  AbstractControl, FormBuilder,
  FormGroup, Validators, FormControl
} from '@angular/forms';

import { AjaxService } from "../../shared";
import { UserServiceService } from "../../core/user-service.service";
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
  isLoading = false;
  userData: any = {};

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, 
    private ajaxService:AjaxService, private userServiceService: UserServiceService) {
      this.userServiceService.userObservable.subscribe(user=>{
        this.userData = user;
        this.createFormGroup();
      })
      this.userServiceService.getUserInfo();
    }
    
    ngOnInit() { }

    createFormGroup(){
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
      this.isLoading = true;
      // console.log(dataToServer)
      // this.ajaxService.execute({url: APIUrls.updateProfile, body: dataToServer})
      // .subscribe(response=>{
      //   console.log(response)
      //   
      // })
      this.userServiceService.updateUser({
        "UserId": 10048,
        "FirstName": "Neww",
        "LastName": "Test ",
        "MiddleName": "Test ",
        "Email": "Test ",
        "BirthDate": "1990-12-12T00:00:00",
        "Users_Location": "",
        "Users_PhoneNumber": "Test ",
        "Users_Passport": "Test ",
        "Users_KTP": 1
      })
      this.isLoading = false;
      this.notEditing = true;
    }
  }
  