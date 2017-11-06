import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { MaterialModule } from "./material/material.module";
import { LayoutModule } from "./layout/layout.module";
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/login.gaurd';
import { HomeModule } from './home/home.module';
import { routing } from "./app.route";
import { FacebookModule } from 'ngx-facebook';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { SharedModule } from "./shared/shared.module";
import { UserServiceService } from "./core/user-service.service";
import { AppConfigService } from "./core/app-config.service";
import { MasterResolver, UserResolver } from "./core/app-provider.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Md2Module }  from 'md2';

export const firebaseConfig = {

};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPageComponent,
  ],
  providers: [
    AngularFireAuth,
    AuthGuard,
    UserServiceService,
    UserResolver,
    MasterResolver,
    AppConfigService
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    HttpModule,
    LayoutModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing,
    MaterialModule,
    HomeModule,
    FacebookModule.forRoot(),
    SharedModule,
    AngularSvgIconModule,
    NgbModule.forRoot(),
    Md2Module
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
