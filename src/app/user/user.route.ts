import {ModuleWithProviders} from "@angular/core"
import {RouterModule, Routes} from "@angular/router";

import { LayoutComponent } from "../layout/layout.component";
import { LayoutContainerComponent } from "../layout/layout-container/layout-container.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { GroupWiseUserListComponent } from "../group/group-wise-user-list/group-wise-user-list.component"
import { UserClaimsComponent } from "../claim/user-claims/user-claims.component";
import { HomeComponent } from "../home/home.component";
import { MasterResolver } from "../core/app-provider.service"

export const routes:Routes = [{
    path: '', component: LayoutContainerComponent,
    resolve : {
        team: MasterResolver
    },
    children: [
        { path: 'my-home', component: HomeComponent, data : {animation: 'home'} },
        { path: 'my-groups', component: GroupWiseUserListComponent },
        { path: 'my-profile', component: UserProfileComponent },
        { path: 'my-claims', component: UserClaimsComponent, data : {animation: 'claims'}},
        
    ]}
]

export const UserRouting = RouterModule.forChild(routes)