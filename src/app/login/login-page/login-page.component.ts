import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css' ]
})
export class LoginPageComponent implements OnInit, AfterViewInit {

  constructor() {
    // console.log(jQuery.fn.jquery)
   }

  ngOnInit() {
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
  }

}
