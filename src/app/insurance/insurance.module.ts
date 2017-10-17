import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { UserPoliciesComponent } from './user-policies/user-policies.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [PolicyListComponent, UserPoliciesComponent],
  exports : [PolicyListComponent, UserPoliciesComponent]
})
export class InsuranceModule { }
