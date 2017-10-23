import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from "../shared/shared.module";

import { MakeClaimComponent } from './make-claim/make-claim.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    MakeClaimComponent
  ],
  exports: [
    MakeClaimComponent
  ]
})
export class ClaimModule { }
