import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { MaterialModule } from "./material/material.module";
import { LayoutModule } from "./layout/layout.module";
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/login.gaurd';
import { HomeModule } from './home/home.module';
import { routing } from "./app.route";
import { FacebookModule } from 'ngx-facebook';

export const firebaseConfig = {
  apiKey: "AIzaSyB5L-dGRKg_eSb3QdIRg_NtSWc7hhsEDsU",
  authDomain: "sample-login-910ae.firebaseapp.com",
  databaseURL: "https://sample-login-910ae.firebaseio.com",
  projectId: "sample-login-910ae",
  storageBucket: "sample-login-910ae.appspot.com",
  messagingSenderId: "448025007228"
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  providers: [
    AngularFireAuth,
    AuthGuard
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
    FacebookModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }