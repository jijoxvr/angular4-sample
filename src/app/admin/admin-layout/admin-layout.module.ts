import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../material/material.module";
import { AdminLayoutComponent } from "./admin-layout.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    AdminLayoutComponent
  ]
})
export class AdminLayoutModule { }
