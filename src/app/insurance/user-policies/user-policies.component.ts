import { Component, OnInit, TemplateRef, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { PolicyStatus, AppConfig } from "../../app-config";
import { APIUrls } from '../../app-config';
import { AjaxService} from '../../shared';

@Component({
  selector: 'app-user-policies',
  templateUrl: './user-policies.component.html',
  styleUrls: ['./user-policies.component.css']
})
export class UserPoliciesComponent implements OnInit {

  dialogRef: MatDialogRef<any> | null;
  private isLoading: boolean;
  private policies: Array<any>;
  private policyStatusLabel = PolicyStatus.label;
  private defaultCurrency = AppConfig.defaultCurrency;

  @ViewChild(TemplateRef) template: TemplateRef<any>;
  constructor(private ajaxService: AjaxService, public dialog: MatDialog) { 
    this.isLoading = true;
  }

  ngOnInit() {
    this.isLoading = true;
    this.ajaxService.execute({url: APIUrls.insuranceList, params : {user_id: 1}}).
      subscribe(response => {
        console.log(response)
        this.isLoading = false;
        this.policies = response;
      }, error => {
        console.log(error)
      })
  }

  getBadgeClass(status){
    return PolicyStatus.badgeClass[status]
  }

  getPolicyInfo(policy){
    switch(policy.status){
      case 2: return PolicyStatus.policyInfo[policy.status].replace('X', policy.days_left_to_make_claim);
      case 3: return PolicyStatus.policyInfo[policy.status].replace('X', policy.valid_from).replace('Y', policy.valid_to);
      default : return PolicyStatus.policyInfo[policy.status];
    }
  }

  
}


