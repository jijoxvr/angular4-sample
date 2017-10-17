import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../material/material.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRouting } from "./dashboard.route";

@NgModule({
  imports: [
    CommonModule,
    DashboardRouting,
    MaterialModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
