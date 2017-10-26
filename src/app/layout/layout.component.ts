import { OverlayContainer } from '@angular/cdk/overlay';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import { Component, ElementRef, Renderer2, ViewEncapsulation, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
})
export class LayoutComponent implements AfterViewInit {

    navItems = [
        { name: 'Home', route: '' },
        { name: 'Claims', route: '/my-claims' },
        { name: 'Profile', route: '/my-profile' },

    ];

    dark = false;
    constructor(
        private _element: ElementRef,
        private _renderer: Renderer2,
        private router: Router,
        private _overlayContainer: OverlayContainer,
        public angularFire: AngularFireAuth) { }

    ngAfterViewInit(){
        // this.router.navigate(['/login']);
    }

    toggleFullscreen() {
        let elem = this._element.nativeElement.querySelector('.demo-content');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullScreen) {
            elem.msRequestFullScreen();
        }
    }

    logout() {
        this.angularFire.auth.signOut();
        localStorage.clear()
        this.router.navigate(['login']);
    }


}
