import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../material/material.module";
import { LayoutComponent } from "./layout.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    LayoutComponent
  ]
})
export class LayoutModule { }
