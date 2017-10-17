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
    this.angularFire.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(s=>{
      console.log(s)
    });
  }
  
  loginWithFB(){
    let provider = new firebase.auth.FacebookAuthProvider()
    provider.addScope("user_birthday")
    this.angularFire.auth.signInWithPopup(provider).then(s=>{
      console.log(s.credential.accessToken)
      console.log(s.user.refreshToken)
      this.angularFire.idToken.subscribe(idToken=>{
        console.log(idToken)
      })
    });
  }
  
}
