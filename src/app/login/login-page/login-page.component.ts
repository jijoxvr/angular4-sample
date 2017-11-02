import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";
import { AjaxService } from '../../shared';
import { APIUrls } from '../../app-config';
import { FacebookService, InitParams, LoginOptions, LoginResponse } from 'ngx-facebook';
declare var $: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css' ]
})
export class LoginPageComponent implements OnInit, AfterViewInit {
  
  
  public loading:boolean = false;
  private accessToken : string;
  private photoUrl : string;
  public message:string;
  
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
      provider.addScope("public_profile,user_friends,email,pages_show_list,user_birthday,user_location,user_about_me,user_education_history,user_hometown,user_location,user_photos,user_relationship_details,user_relationships,user_work_history")
      this.angularFire.auth.signInWithPopup(provider).then(success=>{
        this.loginSuccess(success);
      },error=>{
        this.handleError(error);
      });
    }
    
    loginSuccess(success) {
      // console.log(success.credential) // access token
      // console.log(success.user.refreshToken)
      // this.angularFire.idToken.subscribe(idToken=>{
      //   console.log(idToken)
      // })
      // this.loading = true;
      this.fetchDetails(success.credential.accessToken);
      let user = JSON.parse(JSON.stringify(success.user));
      this.photoUrl = success.user.photoURL
      
    }
    
    loginDirectlyToFB(){
      const loginOptions: LoginOptions = {
        enable_profile_selector: true,
        return_scopes: true,
        scope: 'public_profile,user_friends,email,pages_show_list,user_birthday,user_location,user_about_me,user_education_history,user_hometown,user_location,user_photos,user_relationship_details,user_relationships,user_work_history'
      };
      
      this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        this.fetchDetails(res.authResponse.accessToken)
      })
      .catch(this.handleError);
    }
    
    
    private fetchDetails(accesToken?) {
      
      let params = {
        access_token: accesToken,
        format: 'json',
        fields: 'id,name,first_name,last_name,middle_name,cover,friends.limit(1000),family{relationship},relationship_status,devices,installed,is_verified,install_type,hometown,location,birthday,gender,work,currency',
        method: 'get'
      }
      this.fb.api('/me', 'get', params).then((res: any) => {
        this.accessToken = accesToken;
        this.getUserProfileFromServer(res)
      })
      .catch(this.handleError);
    }
    
    private getUserProfileFromServer(userDetails){
      this.loading = true;
      this.message = 'Please wait while we configure your profile';
      let dataToServer = this.processDataFromFB(userDetails);
      let data = {
        "Status": "EXISTS",
        "Message": "User already exists",
        "Details": [
          {
            "UserId": 10042,
            "FirstName": "Test ",
            "LastName": "Test ",
            "MiddleName": "Test ",
            "Email": "Test ",
            "BirthDate": "1990-12-12T00:00:00",
            "Location": "Trivandrum, India",
            "Users_PhoneNumber": "Test ",
            "Users_Passport": "Test ",
            "Users_KTP": 1,
            "ProfilePic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/11863261_500169563470812_2778436704966522123_n.jpg?oh=5a4af55d5e319b3a8faf864dceefc06b&oe=5A815789",
          }
        ]
      }
      this.loading = false;
      let response = data.Details[0];
      console.log('Data from server', data);
      localStorage.setItem('userData', JSON.stringify(response));
      this.router.navigate(['my-profile']);

      // console.log(JSON.stringify(dataToServer))
      // let dataToServer = JSON.parse('{"AccessToken":"EAAYMYaZBJRX0BAAC62fsHCuMXCKrlcIy61gzJowpkOlBpPfw73yf5E4XgBP7aUAqvvmVlcRHXNGvDDTOOd4Px3PqSE7y35E1u923N1BxTY5QT773H3Xoen7DzMy9eR4OZBOZB5FPiiBdBSDKbSh6kTjb9ZBjtjpZBdxmnSMDAsAZDZD","UniqueId":"579179155569852","Name":"Joy John","Facebook_Birthday":"05/01/1984","Cover":"https://scontent.xx.fbcdn.net/v/t31.0-0/p180x540/15800803_710001389154294_687339573590361756_o.jpg?oh=ff94251c7f71e707689e80fa7ac95b4f&oe=5AA2E2B3","Facebook_Gender":"male","Facebook_ProfLink":"https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/11863261_500169563470812_2778436704966522123_n.jpg?oh=5a4af55d5e319b3a8faf864dceefc06b&oe=5A815789","Facebook_InstallType":"UNKNOWN","Facebook_Installed":"True","Facebook_IsVerified":"False","Facebook_Currency":"INR","Location":{"locationId":"110383752315912","locationName":"Trivandrum, India"},"Employer":[{"EmployerName":"TechVantage Systems Pvt Ltd","EmployerUniqueId":"206639193023867"}],"FriendsData":[{"FriendsUniqueId":"10153909911635590"}],"Family":[]}')
      // this.ajaxService.execute({ url: APIUrls.loginWithFB, method: 'POST', body: dataToServer })
      // .subscribe(data =>{
      //   this.loading = false;
      //   let response = data.Details[0];
      //   response.ProfilePic = this.photoUrl;
      //   console.log('Data from server', data);
      //   localStorage.setItem('userData', JSON.stringify(response));
      //   this.router.navigate(['my-profile']);
      // })
      
    }
    
    private handleError(error) {
      this.loading = false;
      this.message = 'Unable to complete login process'
    }
    
    private processDataFromFB(dataToServer){
      console.log(dataToServer)
      let returnToServer = {
        AccessToken: this.accessToken,
        UniqueId: dataToServer.id,
        Name: dataToServer.name,
        Facebook_Birthday: dataToServer.birthday,
        Email: dataToServer.email,
        Cover: dataToServer.cover ? dataToServer.cover.source : "",
        Facebook_Gender: dataToServer.gender,
        Facebook_ProfLink: this.photoUrl,
        Facebook_InstallType : dataToServer.install_type,
        Facebook_Installed : dataToServer.installed ? 'True' : 'False',
        Facebook_IsVerified : dataToServer.is_verified ? 'True' : 'False',
        Facebook_Currency : dataToServer.currency ? dataToServer.currency.user_currency : "",
        Location: dataToServer.location ?  {
          locationId : dataToServer.location.id,
          locationName : dataToServer.location.name
        } : {},
        Employer :dataToServer.work ?  this.extractWorkFromFBData(dataToServer.work) : [],
        FriendsData :dataToServer.friends ?  this.extractFriendsFromFBData(dataToServer.friends) : [],
        Family :dataToServer.family ?  this.extractFriendsFromFBData(dataToServer.family) : []
        
      }
      console.log(returnToServer)
      return returnToServer;
    }
    extractFriendsFromFBData(data){
      if(data.data) data = data.data
        else return []
          let returnData = data.map(item=>{
        return item ? {
          FriendsUniqueId: item.id
        } : {}
      })
      return returnData 
    }
    
    extractWorkFromFBData(data){
      
      let returnData = data.map(item=>{
        return item.employer ? {
          EmployerName : item.employer.name,
          EmployerUniqueId: item.employer.id
        } : {}
      })
      return returnData 
    }
    
    extractFamilyFromFBData(data){
      
      let returnData = data.map(item=>{
        return item.employer ? {
          FamilyUniqueId : item.family.id,
          Relationship: item.family.relation
        } : {}
      })
      return returnData 
    }
    
    ngAfterViewInit(){
      $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) {
          $("nav").addClass("not-transparent");
        }
        else {
          $("nav").removeClass("not-transparent");
        }
      });
      
      $('header').css({ 'height': $(window).height() });
      $(window).on('resize', function() {
        $('header').css({ 'height': $(window).height() });
      });
      this.scrollNav()
    }
    
    scrollNav(){
      let component = this;
      $('.nav a').click(function(){  
        //Toggle Class
        component.openSidenav();
        $(".active").removeClass("active");      
        $(this).closest('li').addClass("active");
        var theClass = $(this).attr("class");
        $('.'+theClass).parent('li').addClass('active');
        //Animate
        $('html, body').stop().animate({
          scrollTop: $( $(this).attr('href') ).offset().top - 160
        }, 1000);
        return false;
      });
      $('.scrollTop a').scrollTop();
    }
    
    openSidenav(){
      let isOpened = $('.navbar-collapse').hasClass('in');
      if(isOpened) $('.navbar-collapse').removeClass('in');
      else $('.navbar-collapse').addClass('in');
    }
    
    
  }
  