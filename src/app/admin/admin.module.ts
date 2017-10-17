import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../material/material.module";
import { AdminRouting } from "./admin.route";
import { AdminLayoutModule } from "./admin-layout/admin-layout.module";
import { AdminDashboardModule } from "./admin-dashboard/admin-dashboard.module";
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserModule } from "../user/user.module";

@NgModule({
  imports: [
    CommonModule,
    AdminLayoutModule,
    MaterialModule,
    AdminDashboardModule,
    UserModule,
    AdminRouting
  ],
  declarations: [

  AdminLoginComponent]
})
export class AdminModule { }
