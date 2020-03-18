import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './email-confirm.component.html',
    styleUrls: ['./email-confirm.component.scss']
})
export class EmailConfirmComponent{
   
    constructor(
      private router: Router
    ) { }
    
    goToLogin() {
      this.router.navigateByUrl('login');
    }
}
