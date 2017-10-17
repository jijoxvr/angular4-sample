import {ModuleWithProviders} from "@angular/core"
import {RouterModule, Routes} from "@angular/router";

import { LayoutComponent } from "../layout/layout.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { GroupWiseUserListComponent } from "../group/group-wise-user-list/group-wise-user-list.component"
import { HomeComponent } from "../home/home.component";

export const routes:Routes = [{
    path: '', component: LayoutComponent,
    children: [
        { path: '', component: HomeComponent },
        { path: 'my-groups', component: GroupWiseUserListComponent },
        { path: 'my-profile', component: UserProfileComponent },
        
    ]}
]

export const UserRouting = RouterModule.forChild(routes)