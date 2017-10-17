import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceModule } from "../insurance/insurance.module";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    InsuranceModule
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule { }
