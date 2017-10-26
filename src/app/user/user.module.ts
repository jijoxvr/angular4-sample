import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from "../material/material.module";
import { GroupModule } from "../group/group.module";
import { HomeModule } from "../home/home.module";
import { LayoutModule } from "../layout/layout.module";
import { ClaimModule } from "../claim/claim.module";

import { UserRouting } from "./user.route";

import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileCompleteComponent } from './user-profile-complete/user-profile-complete.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GroupModule,
    HomeModule,
    UserRouting,
    LayoutModule,
    ClaimModule
  ],
  declarations: [UserListComponent, UserProfileComponent, UserProfileCompleteComponent]
})
export class UserModule { }
