import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { LoginModel } from '../../models/login.model';
import { GlobalConfig } from '../../app/configs/global.config';
import { SessionStorageService } from 'angular-web-storage';
import { Links } from '../../models/links.model';
import { SignUpModel } from '../../models/signup.model';
import { CreateLinkModel } from '../../models/create-link.model';
import { GetLinkDetailsModel } from '../../models/get-link-details.model';
import { timeout, retry, catchError, switchMap, finalize } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs';
import { ResetModel } from '../../models/reset.model';

@Injectable()
export class UserAccountService {
    constructor(
        private httpClient: HttpClient, 
        private authService: AuthService,
        private session: SessionStorageService) {}

    login(login: LoginModel) {
        return this.authService.login(login);
    }

    signUp(signup: SignUpModel) {
        return this.authService.signUp(signup);
    }

    getLinks(): Promise<Links[]>{
        const header = {
            'Authorization': `Bearer ${this.session.get('_at')}`
        }
        return this.httpClient.get(GlobalConfig.ADD_AUTH_URL('api/linkList'), {headers: header} )
               .toPromise()
               .then(response => response as Links[])
    }

    getLinkDetails(getLinkDetails: GetLinkDetailsModel): Promise<Links[]>{
        const options = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.session.get('_at')}`,
            })
        }

        const params = new HttpParams()
        .set('id', getLinkDetails.id.toString())
        .set('slash_tag', getLinkDetails.slash_tag)
        .set('destination_url', getLinkDetails.destination_url)
        .set('protocol', 'http')
        .set('_type', 'Hours')

        return this.httpClient.get(GlobalConfig.ADD_AUTH_URL('api/getLinkDetails'), { headers: options.headers , params} )
            .pipe(
                timeout(9000000),
                
            )
            .toPromise()
            .then(response =>{
                console.log("UserAccountService -> getLinkDetails -> response", response)
                return response as Links[]
            });
    }

    deleteLinks(id): Promise<boolean>{
        const options = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.session.get('_at')}`
            }),
            body: {
              id: id
            }
          }
        return this.httpClient.delete(GlobalConfig.ADD_AUTH_URL('api/deleteLink/'), options)
               .toPromise()
               .then(response => response as boolean)
    }

    createLink(createLinkModel: CreateLinkModel): Promise<Links[]>{
        const header = {
            'Authorization': `Bearer ${this.session.get('_at')}`
        }
        return this.httpClient.post(GlobalConfig.ADD_AUTH_URL('api/createLink'), createLinkModel , {headers: header} )
               .toPromise()
               .then(response => response as Links[])
    }

    createResetPassword(email: string): Promise<any>{
        // const header = {
        //     'Authorization': `Bearer ${this.session.get('_at')}`
        // }
        return this.httpClient.post(GlobalConfig.ADD_AUTH_URL('api/create'), { email} , {} )
               .toPromise()
               .then(response => response)
    }
    resetPassword(reset: ResetModel): Promise<any>{
        // const header = {
        //     'Authorization': `Bearer ${this.session.get('_at')}`
        // }
        return this.httpClient.post(GlobalConfig.ADD_AUTH_URL('api/reset'), reset , {} )
               .toPromise()
               .then(response => response)
    }
}