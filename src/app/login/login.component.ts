import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";
import { AjaxService } from '../shared';
import { APIUrls } from '../app-config';
import { FacebookService, InitParams, LoginOptions, LoginResponse } from 'ngx-facebook';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public loading:boolean = false;
  private accessToken : string;
  private photoUrl : string;
  constructor(public angularFire: AngularFireAuth, private router: Router,
    private fb: FacebookService, private ajaxService: AjaxService) {

    let initParams: InitParams = {
      appId: '1702463556633981',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
   }
  
  ngOnInit() {}
  
  loginWithTwitter() {
    alert('Twitter login is not available now')
    // this.angularFire.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(success=>{
    //   this.loginSuccess(success);
    // });
  }
  
  loginWithFB(){
    let provider = new firebase.auth.FacebookAuthProvider()
    provider.addScope("public_profile,user_friends,email,pages_show_list,user_birthday,,user_location")
    this.angularFire.auth.signInWithPopup(provider).then(success=>{
      this.loginSuccess(success);
    });
  }

  loginSuccess(success) {
    // console.log(success.credential) // access token
    // console.log(success.user.refreshToken)
    // this.angularFire.idToken.subscribe(idToken=>{
    //   console.log(idToken)
    // })
    this.loading = true;
    this.fetchDetails(success.credential.accessToken);

    
    let user = JSON.parse(JSON.stringify(success.user));
    this.photoUrl = success.user.photoURL
    
  }

  loginDirectlyToFB(){
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list,user_birthday,user_location'
    };

    this.fb.login(loginOptions)
    .then((res: LoginResponse) => {
      console.log('Logged in', res);
      this.fetchDetails(res.authResponse.accessToken)
    })
    .catch(this.handleError);
  }


  private fetchDetails(accesToken?) {
    let params = {
      access_token: accesToken,
      format: 'json',
      fields: 'id,name,birthday,email,location,work,cover,first_name,last_name,friends.limit(1000){name,email}',
      method: 'get'
    }
    this.fb.api('/me', 'get', params).then((res: any) => {
      console.log('Got the users profile', res);
      this.loading = true;
      this.accessToken = accesToken;
      this.getUserProfileFromServer(res)
    })
    .catch(this.handleError);
  }

  private getUserProfileFromServer(userDetails){
    let dataToServer = Object.assign({}, userDetails);
    dataToServer.uid = userDetails.id;
    dataToServer.accessToken = this.accessToken;
    dataToServer.photoURL = this.photoUrl;
    delete dataToServer.id;
    this.loading = true;
    this.ajaxService.execute({ url: APIUrls.loginWithFB, method: 'post', body: dataToServer })
      .subscribe(data =>{
        console.log('Data from server', data)
        localStorage.setItem('userData', JSON.stringify(dataToServer));
        this.router.navigate(['my-profile']);
      })

  }

  private handleError(error) {
    console.error('Error processing action', error);
  }
  
}
