import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { SessionStorageService } from 'angular-web-storage';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { NotifierAppService } from '../../../services/notifier/notifier.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    private name: string;

    constructor(
        public location: Location, 
        private router: Router, 
        private session: SessionStorageService,
        private authService: AuthService,
        private notifier: NotifierAppService) {
        this.name = this.session.get('_user').name;
    }

    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    logout(){
        this.authService.logout().subscribe(response =>{
            this.notifier.showSuccessNotification('Logged Out Successfully');
            this.router.navigateByUrl('login');
        });
    }

    goToDashboard(){
        this.router.navigateByUrl('/dashboard');
    }
}
