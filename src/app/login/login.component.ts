import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(public angularFire: AngularFireAuth, private router: Router) { }
  
  ngOnInit() {}
  
  loginWithTwitter() {
    this.angularFire.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(success=>{
      this.loginSuccess(success);
    });
  }
  
  loginWithFB(){
    let provider = new firebase.auth.FacebookAuthProvider()
    provider.addScope("user_birthday")
    this.angularFire.auth.signInWithPopup(provider).then(success=>{
      this.loginSuccess(success);
    });
  }

  loginSuccess(success) {
    // console.log(success.credential.accessToken)
    // console.log(success.user.refreshToken)
    // this.angularFire.idToken.subscribe(idToken=>{
    //   console.log(idToken)
    // })
    localStorage.setItem('userData', JSON.stringify(success.user));
    this.router.navigate(['my-profile']);
  }
  
}
