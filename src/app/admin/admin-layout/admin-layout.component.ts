import { OverlayContainer } from '@angular/cdk/overlay';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
})
export class AdminLayoutComponent {

    navItems = [
        { name: 'Dashboard', route: '/admin/dashboard', icon: 'home' },
        { name: 'Users', route: '/admin/users' },

    ];

    dark = false;
    constructor(
        private _element: ElementRef,
        private _renderer: Renderer2,
        private _overlayContainer: OverlayContainer,
        public angularFire: AngularFireAuth) { }

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
    }


}
