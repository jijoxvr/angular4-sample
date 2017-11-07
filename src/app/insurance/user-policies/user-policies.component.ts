import { Component, OnInit, TemplateRef, ViewChild, Inject, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {
  PolicyStatus, AppConfig, APIUrls,
  AppLabels, SvgIcons
} from "../../app-config";
import { AjaxService } from '../../shared';
import { UserServiceService } from '../../core/user-service.service';
import { AppConfigService } from '../../core/app-config.service';
import { MakeClaimComponent } from "../../claim/make-claim/make-claim.component";
import * as moment from "moment";
import {  Subject} from "rxjs/Rx";
//configuration for claim form
import { claimDialogConfig } from "../../claim/make-claim/make-claim.component.config";
declare var $: any;

@Component({
  selector: 'app-user-policies',
  templateUrl: './user-policies.component.html',
  styleUrls: ['./user-policies.component.css']
})
export class UserPoliciesComponent implements OnInit, AfterViewInit {

  claimConfirmDialogRef: MatDialogRef<any> | null; // for pre-claim confirmation
  claimDialogRef: MatDialogRef<any> | null; // for claim form

  public appLabel = AppLabels;
  public isLoading: boolean;
  public isResolved: boolean;
  public policies: Array<any>;
  public defaultCurrency = AppConfig.defaultCurrency;
  public userData: any;
  public insuranceStatus: any;
  public observer: Subject<any>

  @ViewChild('claimConfirmationDialogRef') template: TemplateRef<any>;

  constructor(private ajaxService: AjaxService,
    public dialog: MatDialog, private appConfigService: AppConfigService,
    private userServiceService: UserServiceService,
    private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,
    private elRef: ElementRef) {
    this.observer =  new Subject<any>();
    iconRegistry
      .addSvgIcon('claimDetailsIcon', sanitizer.bypassSecurityTrustResourceUrl(SvgIcons.claimDetails))
      .addSvgIcon('activateLinkIcon', sanitizer.bypassSecurityTrustResourceUrl(SvgIcons.activationLink))
      .addSvgIcon('cancelPolicyIcon', sanitizer.bypassSecurityTrustResourceUrl(SvgIcons.cancelPolicy))
      .addSvgIcon('insuranceDetailsIcon', sanitizer.bypassSecurityTrustResourceUrl(SvgIcons.insuranceDetails))
      .addSvgIcon('paymentIcon', sanitizer.bypassSecurityTrustResourceUrl(SvgIcons.payment))
      .addSvgIcon('makeClaimIcon', sanitizer.bypassSecurityTrustResourceUrl(SvgIcons.makeClaim))

    this.insuranceStatus = appConfigService.insuranceStatus;
    this.userServiceService.userObservable.subscribe(user => {
      this.userData = user;
    })
    this.userServiceService.getUserInfo();
    this.isLoading = true;
  }

  ngAfterViewInit(){
    console.log($('.policy-container'))
    this.observer.subscribe(length=>{
      if(length == 1)
        $('.policy-container').addClass('contaner-with-single-content');
    })

  }

  ngOnInit() {
    this.isLoading = true;
    this.isResolved = false;
    // this.userData.UserId = '10034';
    this.ajaxService.execute({ url: APIUrls.insuranceList, method: 'POST', body: { UserId: this.userData.UserId } }).
      subscribe(response => {
        this.isLoading = false;
        this.isResolved = true;
        this.policies = response.Details ? response.Details : [];
        this.observer.next(this.policies.length)
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
              "StatusCode": 'ACTV',
              "StatusMessage": "From X to Y"
            },
            // {
            //   "Insurance_Id": 2,
            //   "PremiumAmount": 600,
            //   "InsuranceDate": "2017-12-12T00:00:00",
            //   "Device": "Google Pixel  XL",
            //   "StatusId": 5,
            //   "StartDate": "2017-11-08T00:00:00",
            //   "EndDate": "2018-10-09T00:00:00",
            //   "StatusName": "Claimed",
            //   "StatusCode": 'CLM',
            //   "StatusMessage": "You have made claim"
            // },
            // {
            //   "Insurance_Id": 3,
            //   "PremiumAmount": 600,
            //   "InsuranceDate": "2017-12-12T00:00:00",
            //   "Device": "Google Pixel  XL",
            //   "StatusId": 4,
            //   "StartDate": "2017-05-09T00:00:00",
            //   "EndDate": "2018-10-09T00:00:00",
            //   "StatusName": "Activated",
            //   "StatusCode": 'ACTV',
            //   "StatusMessage": "From X to Y"
            // }
          ]
        }
        this.policies = response.Details ? response.Details : [];
        this.observer.next(this.policies.length)
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

  getRibbonClass(code) {
    
    if(code == 'ACTV')
      return 'acivated-policy-ribbon';
    else if(code == 'CLM')
      return 'pending-policy-ribbon';
    else
      return 'claimed-policy-ribbon';
  }

  getPolicyInfo(policy) {
    switch (policy.StatusId) {
      case 3:
        return policy.StatusMessage.replace('X', policy.DaysLeft ? policy.DaysLeft : 'N/A');
      case 4:
        let startDate = policy.StartDate ? moment(policy.StartDate).format('DD/MM/YY') : 'N/A';
        let endDate = policy.EndDate ? moment(policy.EndDate).format('DD/MM/YY') : 'N/A';
        return policy.StatusMessage.replace('X', startDate).replace('Y', endDate);
      default: return policy.StatusMessage;
    }
  }

  getPolicyDate(date) {
    return date ? moment(date).format('DD/MM/YY') : 'N/A'
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

