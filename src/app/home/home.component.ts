  import { Component, OnInit } from '@angular/core';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent implements OnInit {
    userData: any;
    constructor() {
      this.user();
    }

    ngOnInit() {}

    user() {
      if (localStorage.getItem('userData')) {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        console.log(this.userData);
      }
      else {
        console.log("No Data");
      }

    }

  }
