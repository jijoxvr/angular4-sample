import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceModule } from "../insurance/insurance.module";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { ClaimModule } from "../claim/claim.module";
import { HomeComponent } from "./home.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    InsuranceModule,
    ClaimModule,
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule { }
