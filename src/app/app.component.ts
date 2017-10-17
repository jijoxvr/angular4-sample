import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;
  constructor(public angularFire: AngularFireAuth, private router: Router) {
    
    this.angularFire.authState.subscribe(
      (auth) => {
        if(auth == null) {
          this.router.navigate(['login']);
          this.isLoggedIn = false;
        }
        else {
          this.isLoggedIn = true;
          localStorage.setItem('userData', JSON.stringify(auth));
          if(window.location.hash == "#/login")
            this.router.navigate(['']);
        }
      }
    );
  }

  logout() {
    this.angularFire.auth.signOut();
  }
 
}