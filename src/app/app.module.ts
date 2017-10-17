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
import { HomeComponent } from './home/home.component';
import { routing } from "./app.route";

export const firebaseConfig = {
  //
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppComponent,
    LoginComponent,
    HomeComponent
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
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }