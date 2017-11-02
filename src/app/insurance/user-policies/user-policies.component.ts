import { Component, OnInit, TemplateRef, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PolicyStatus, AppConfig, APIUrls, AppLabels } from "../../app-config";
import { AjaxService } from '../../shared';
import { UserServiceService } from '../../core/user-service.service';
import { MakeClaimComponent } from "../../claim/make-claim/make-claim.component";
import * as moment from "moment";
//configuration for claim form
import { claimDialogConfig } from "../../claim/make-claim/make-claim.component.config";


@Component({
  selector: 'app-user-policies',
  templateUrl: './user-policies.component.html',
  styleUrls: ['./user-policies.component.css']
})
export class UserPoliciesComponent implements OnInit {

  claimConfirmDialogRef: MatDialogRef<any> | null; // for pre-claim confirmation
  claimDialogRef: MatDialogRef<any> | null; // for claim form

  public appLabel = AppLabels;
  public isLoading: boolean;
  public isResolved: boolean;
  public policies: Array<any>;
  public defaultCurrency = AppConfig.defaultCurrency;
  public userData: any;

  @ViewChild('claimConfirmationDialogRef') template: TemplateRef<any>;

  constructor(private ajaxService: AjaxService,
    public dialog: MatDialog, private userServiceService: UserServiceService) {
    this.userServiceService.userObservable.subscribe(user => {
      this.userData = user;
    })
    this.userServiceService.getUserInfo();
    this.isLoading = true;
  }

  ngOnInit() {
    this.isLoading = true;
    this.isResolved = false;
    this.ajaxService.execute({ url: APIUrls.insuranceList, params: { user_id: this.userData.UserId } }).
      subscribe(response => {
        this.isLoading = false;
        this.isResolved = true;
        this.policies = response.Details ? response.Details : [];
      }, error => {
        this.isLoading = false;
        this.isResolved = true;
        let response = {
          "Status": "SUCCESS",
          "Message": "Hello Test , Here are your existing policies. Which product would you like to claim?",
          "Details": [
            {
              "Insurance_Id": 1,
              "PremiumAmount": 600,
              "InsuranceDate": "2017-12-12T00:00:00",
              "Device": "Google Pixel  XL",
              "StatusId": 4,
              "StartDate": "2017-10-09T00:00:00",
              "EndDate": "2018-10-09T00:00:00",
              "StatusName": "Activated",
              "StatusMessage": "From X to Y"
            },
            {
              "Insurance_Id": 2,
              "PremiumAmount": 600,
              "InsuranceDate": "2017-12-12T00:00:00",
              "Device": "Google Pixel  XL",
              "StatusId": 5,
              "StartDate": "2017-11-08T00:00:00",
              "EndDate": "2018-10-09T00:00:00",
              "StatusName": "Claimed",
              "StatusMessage": "You have made claim"
            },
            {
              "Insurance_Id": 3,
              "PremiumAmount": 600,
              "InsuranceDate": "2017-12-12T00:00:00",
              "Device": "Google Pixel  XL",
              "StatusId": 4,
              "StartDate": "2017-05-09T00:00:00",
              "EndDate": "2018-10-09T00:00:00",
              "StatusName": "Activated",
              "StatusMessage": "From X to Y"
            }
          ]
        }
        this.policies = response.Details ? response.Details : [];
      })



  }

  askConfirmationForClaim(policy, index) {
    claimDialogConfig.data = policy;
    this.claimConfirmDialogRef = this.dialog.open(this.template, claimConfirmDialogConfig);
    this.claimConfirmDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.openClaimForm(index);
      }
    })

  }

  openClaimForm(index) {
    this.claimDialogRef = this.dialog.open(MakeClaimComponent, claimDialogConfig);
    this.claimDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.policies[index].status = 4;
      }
    })
  }

  getBadgeClass(status) {
    return PolicyStatus.badgeClass[status]
  }

  getPolicyInfo(policy) {
    switch (policy.StatusId) {
      case 3: 
        return policy.StatusMessage.replace('X', policy.DaysLeft ? policy.DaysLeft : 'N/A' );
      case 4:
        let startDate = policy.StartDate ? moment(policy.StartDate).format('DD/MM/YYY') : 'N/A';
        let endDate = policy.EndDate ? moment(policy.EndDate).format('DD/MM/YYY') : 'N/A';
        return policy.StatusMessage.replace('X', startDate).replace('Y', endDate);
      default: return policy.StatusMessage;
    }
  }

  getPolicyDate(date){
    return date ? moment(date).format('DD/MM/YYYY') : 'N/A'
  }
  navigateToClaimTab() { }


}

// configuration for pre claim confirmation dialog
const claimConfirmDialogConfig = {
  disableClose: false,
  panelClass: 'custom-overlay-pane-class',
  hasBackdrop: true,
  backdropClass: '',
  width: '600px',
  height: '500px',
  position: {
    top: '',
    bottom: '',
    left: '',
    right: ''
  }
}

