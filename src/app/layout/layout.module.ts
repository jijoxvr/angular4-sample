import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../material/material.module";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LayoutContainerComponent } from './layout-container/layout-container.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule.forRoot(),
    RouterModule,
    MaterialModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SideBarComponent,
    LayoutContainerComponent
  ]
})
export class LayoutModule { }
