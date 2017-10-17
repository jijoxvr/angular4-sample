import {ModuleWithProviders} from "@angular/core"
import {RouterModule, Routes} from "@angular/router";

import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";

import { UserListComponent } from "../user/user-list/user-list.component";

export const routes:Routes = [{
    path: '', component: AdminLayoutComponent,
    children: [
        { path: 'dashboard', component: AdminDashboardComponent },
        { path: 'users', component: UserListComponent },
        
    ]
}

];

export const AdminRouting = RouterModule.forChild(routes)