import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRouting } from "./dashboard.route";

@NgModule({
  imports: [
    CommonModule,
    DashboardRouting,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
  ]
})
export class DashboardModule { }