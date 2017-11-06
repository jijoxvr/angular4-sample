import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from "../shared/shared.module";
import { Md2Module }  from 'md2';

import { MakeClaimComponent } from './make-claim/make-claim.component';
import { UserClaimsComponent } from './user-claims/user-claims.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    // Md2Module
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
