import { Component, OnInit } from '@angular/core';
import { SharedDetails } from '../shared/shared-details';
import { SessionStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    count: number;
    name: string
    constructor(
        private session: SessionStorageService,
        private router: Router) { }

    ngOnInit() {
        this.count = SharedDetails.links.length;
        this.name = this.session.get('_user').name;
    }

    resetPassword() {
        this.router.navigateByUrl('forgot-password');
    }

}
