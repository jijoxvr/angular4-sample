import { Component, OnInit, TemplateRef, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ClaimStatus, AppConfig, ClaimLabels } from "../../app-config";
import { APIUrls, AppLabels } from '../../app-config';
import { AjaxService } from '../../shared';
import { UserServiceService } from '../../core/user-service.service';

// import { MakeClaimComponent } from "../../claim/make-claim/make-claim.component";

//configuration for claim form
// import { claimDialogConfig } from "../../claim/make-claim/make-claim.component.config";

@Component({
  selector: 'app-user-claims',
  templateUrl: './user-claims.component.html',
  styleUrls: ['./user-claims.component.css']
})
export class UserClaimsComponent implements OnInit {

  claimConfirmDialogRef: MatDialogRef<any> | null; // for pre-claim confirmation
  claimDialogRef: MatDialogRef<any> | null; // for claim form

  appLabels = AppLabels;
  public isLoading: boolean;
  public isResolved: boolean;
  public claims: Array<any>;
  public claimStatusLabel = ClaimStatus.label;
  public defaultCurrency = AppConfig.defaultCurrency;
  public issuelabel = ClaimLabels;
  public userData: any;

  // @ViewChild('claimConfirmationDialogRef') template: TemplateRef<any>;

  constructor(private ajaxService: AjaxService, public dialog: MatDialog,
    public userServiceService:UserServiceService) {
    this.isLoading = true;
    this.userServiceService.userObservable.subscribe(user => {
      this.userData = user;
    })
    this.userServiceService.getUserInfo();
  }

  ngOnInit() {
    this.isLoading = true;
    this.isResolved = false;
    this.ajaxService.execute({ url: APIUrls.claimList, method: 'POST', body: { UserId: this.userData.UserId } }).
      subscribe(response => {
        this.isLoading = false;
        this.isResolved = true;
        this.claims = response;
      }, error => {
      })
  }

  // askConfirmationForClaim(policy) {
  //   claimDialogConfig.data = policy;
  //   this.claimConfirmDialogRef = this.dialog.open(this.template, claimConfirmDialogConfig);
  //   this.claimConfirmDialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.openClaimForm();
  //     }
  //   })

  // }

  // openClaimForm() {
  //   this.claimDialogRef = this.dialog.open(MakeClaimComponent, claimDialogConfig);
  //   this.claimDialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       console.log('here')
  //     }
  //   })
  // }

  getBadgeClass(status) {
    return ClaimStatus.badgeClass[status]
  }

  // getPolicyInfo(policy) {
  //   switch (policy.status) {
  //     case 2: return PolicyStatus.policyInfo[policy.status].replace('X', policy.days_left_to_make_claim);
  //     case 3: return PolicyStatus.policyInfo[policy.status].replace('X', policy.valid_from).replace('Y', policy.valid_to);
  //     default: return PolicyStatus.policyInfo[policy.status];
  //   }
  // }

}
