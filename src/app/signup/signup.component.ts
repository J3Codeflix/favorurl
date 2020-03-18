import { Component, OnInit } from '@angular/core';
import { SignUpModel } from '../../models/signup.model';
import { UserAccountService } from '../../services/user/user-account.service';
import { Router } from '@angular/router';
import { NotifierAppService } from '../../services/notifier/notifier.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    test : Date = new Date();
    focus;
    focus1;
    focus2;
    signup: SignUpModel = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    constructor(
        private accountService: UserAccountService,
        private router: Router,
        private notifier: NotifierAppService
    ) { }

    signUp(){
        console.log("SignupComponent -> signUp -> this.signup", this.signup)
        this.accountService.signUp(this.signup).subscribe((response:boolean) => {
            if(response){
              this.notifier.showSuccessNotification('Signup Successful');
              this.router.navigateByUrl('/dashboard');
            }else{
              this.notifier.showErrorNotification('Invalid Credentials');
            }
          },
          (err) => {
            this.notifier.showErrorNotification('Invalid Credentials');
            console.log('error:: ', err);
          });
    }
}
