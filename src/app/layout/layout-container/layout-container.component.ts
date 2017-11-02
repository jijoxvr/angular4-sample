import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from "./animation";
import { UserServiceService } from "../../core/user-service.service";


@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class LayoutContainerComponent implements OnInit {

  constructor(public router: Router, public userServiceService:UserServiceService) {
    this.userServiceService.userObservable.subscribe(user=>{
      this.userData = user;
    })
    this.userServiceService.getUserInfo();
  }

  userData: any;

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/my-home']);
    }
  }

  
  public getState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }

 

}
