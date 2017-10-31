import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LayoutContainerComponent } from './layout-container/layout-container.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule.forRoot(),
    RouterModule,
    MaterialModule,
    NgxPageScrollModule,
    SharedModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SideBarComponent,
    LayoutContainerComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
