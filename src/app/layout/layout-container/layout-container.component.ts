import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from "./animation"


@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class LayoutContainerComponent implements OnInit {

  constructor(public router: Router) { 
    this.user()
  }

  userData:any;

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/my-home']);
    }
  }

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
  public getState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }

}
