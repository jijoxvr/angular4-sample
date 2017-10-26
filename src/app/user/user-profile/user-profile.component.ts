import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData: any = {};
  constructor() {
    this.user();
  }

  ngOnInit() { }

  user() {
    if (localStorage.getItem('userData')) {
      let data = JSON.parse(localStorage.getItem('userData'));
      this.userData = {
        displayName : data.name,
        email: data.email,
        address: data.location ? data.location.name: 'N/A',
        birthday: data.birthday,
        photoURL: data.photoURL
      }
    }
    else {
    }
  }

}
