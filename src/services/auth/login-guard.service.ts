import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { SessionStorageService } from 'angular-web-storage';
@Injectable()
export class LoginAuthGuardService implements CanActivate {
  constructor(
      public auth: AuthService, 
      public router: Router,
      private sessionStorage: SessionStorageService) {}
  canActivate(): boolean {
    if (this.sessionStorage.get('_at')) {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
    return true;
  }
}