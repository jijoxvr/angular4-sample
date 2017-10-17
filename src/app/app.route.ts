import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./login/login.gaurd";
import { HomeComponent } from "./home/home.component";
import { ModuleWithProviders } from "@angular/core";


export const routes: Routes = [{
        path: '',
        loadChildren : "./user/user.module#UserModule",
        canActivate: [AuthGuard],
        
    },{
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canActivate: [AuthGuard],
    },{
        path: 'login',
        component: LoginComponent
    },{
        path: 'admin-login',
        component: LoginComponent
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
