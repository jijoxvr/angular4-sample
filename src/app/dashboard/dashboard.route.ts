import {ModuleWithProviders} from "@angular/core"
import {RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from "./dashboard.component";

export const routes:Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { pageTitle: 'Dashboard' }

  },

];

export const DashboardRouting = RouterModule.forChild(routes)