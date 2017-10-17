import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../material/material.module";
import { AdminDashboardComponent } from "./admin-dashboard.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    AdminDashboardComponent
  ]
})
export class AdminDashboardModule { }
