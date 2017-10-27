import { Component, OnInit, TemplateRef, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PolicyStatus, AppConfig } from "../../app-config";
import { APIUrls } from '../../app-config';
import { AjaxService } from '../../shared';
import { MakeClaimComponent } from "../../claim/make-claim/make-claim.component";

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

  public isLoading: boolean;
  public isResolved: boolean;
  public policies: Array<any>;
  public policyStatusLabel = PolicyStatus.label;
  public defaultCurrency = AppConfig.defaultCurrency;

  @ViewChild('claimConfirmationDialogRef') template: TemplateRef<any>;

  constructor(private ajaxService: AjaxService, public dialog: MatDialog) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.isLoading = true;
    this.isResolved = false;
    this.ajaxService.execute({ url: APIUrls.insuranceList, params: { user_id: 1 } }).
      subscribe(response => {
        this.isLoading = false;
        this.isResolved = true;
        this.policies = response;
      }, error => {
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
    switch (policy.status) {
      case 2: return PolicyStatus.policyInfo[policy.status].replace('X', policy.days_left_to_make_claim);
      case 3: return PolicyStatus.policyInfo[policy.status].replace('X', policy.valid_from).replace('Y', policy.valid_to);
      default: return PolicyStatus.policyInfo[policy.status];
    }
  }

  navigateToClaimTab(){
    
  }


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

