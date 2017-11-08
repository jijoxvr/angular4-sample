import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from "moment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pushRightClass: string = 'push-right';
  today = moment().format('DD/MM/YY');

  @Input()
  public userData: any;
  
  constructor(public router: Router, public angularFire: AngularFireAuth) {
      this.router.events.subscribe((val) => {
          if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
              this.toggleSidebar();
          }
      });
  }

  ngOnInit() {}

  isToggled(): boolean {
      const dom: Element = document.querySelector('body');
      return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle('rtl');
  }

  logout() {
    this.angularFire.auth.signOut();
    localStorage.clear();
    this.router.navigate(['login']);
  }

  changeLang(test){
    return;
  }
}
