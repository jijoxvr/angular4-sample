import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ClaimModule } from "../claim/claim.module";
import { MakeClaimComponent } from "../claim/make-claim/make-claim.component";

import { PolicyListComponent } from './policy-list/policy-list.component';
import { UserPoliciesComponent } from './user-policies/user-policies.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ClaimModule,
    AngularSvgIconModule
  ],
  declarations: [PolicyListComponent, UserPoliciesComponent],
  exports : [PolicyListComponent, UserPoliciesComponent],
  entryComponents : [
    MakeClaimComponent
  ]
})
export class InsuranceModule { }
