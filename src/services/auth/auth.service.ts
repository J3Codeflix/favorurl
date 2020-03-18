import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../../models/login.model';
import { HttpClient } from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'angular-web-storage';
import { GlobalConfig } from '../../app/configs/global.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SignUpModel } from '../../models/signup.model';

@Injectable()
export class AuthService {
  constructor(
      private httpClient: HttpClient, 
      private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) {}
  // ...
  public isAuthenticated(): boolean {
    const token = this.sessionStorage.get('_at');
    if(token) {
        return true;
    }else {
        return false;
    }
    // Check whether the token is expired and return
    // true or false
    // return !this.jwtHelper.isTokenExpired(token);
  }

  public login(login: LoginModel) {
    return this.httpClient.post(GlobalConfig.ADD_AUTH_URL('api/login') , login , { observe: 'body' })
            .pipe(map(authenticateSuccess.bind(this)));
    function authenticateSuccess(response) {
        if (response.accessToken.length > 0) {
            this.storeAuthenticationToken(response, login);
            return true;
        }
        return false;
    }
  }

  public signUp(login: SignUpModel) {
    return this.httpClient.post(GlobalConfig.ADD_AUTH_URL('api/register') , login , { observe: 'body' })
            .pipe(map(authenticateSuccess.bind(this)));
    function authenticateSuccess(response) {
        if (response.accessToken.length > 0) {
            this.storeAuthenticationToken(response, login);
            return true;
        }
        return false;
    }
  }

  storeAuthenticationToken({user, accessToken }) {
      this.sessionStorage.set('_user', user);
      this.sessionStorage.set('_at', accessToken);
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      this.sessionStorage.remove('_at');
      this.sessionStorage.remove('_user');
      observer.next();
    });
  }
}