import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from "../shared/shared.module";

import { MakeClaimComponent } from './make-claim/make-claim.component';
import { UserClaimsComponent } from './user-claims/user-claims.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    MakeClaimComponent,
    UserClaimsComponent
  ],
  exports: [
    MakeClaimComponent,
    UserClaimsComponent
  ]
})
export class ClaimModule { }
