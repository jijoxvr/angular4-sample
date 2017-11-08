import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from "./login/login.component";
import { LoginPageComponent } from "./login/login-page/login-page.component";
import { AuthGuard } from "./login/login.gaurd";
import { HomeComponent } from "./home/home.component";
import { ModuleWithProviders } from "@angular/core";
import { MasterResolver, UserResolver } from "./core/app-provider.service";


export const routes: Routes = [{
        path: '',
        loadChildren : "./user/user.module#UserModule",
        canActivate: [AuthGuard],
        resolve: {
            data1: UserResolver,
        }
        
    },{
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canActivate: [AuthGuard],
    },{
        path: 'login',
        component: LoginPageComponent
    },{
        path: 'admin-login',
        component: LoginComponent
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
