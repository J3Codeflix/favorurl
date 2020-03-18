import { Component, OnInit } from '@angular/core';
import { SignUpModel } from '../../models/signup.model';
import { UserAccountService } from '../../services/user/user-account.service';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { NotifierAppService } from '../../services/notifier/notifier.service';
import { ResetModel } from '../../models/reset.model';

@Component({
    selector: 'app-signup',
    templateUrl: './password-input.component.html',
    styleUrls: ['./password-input.component.scss']
})
export class ResetPasswordComponent implements OnInit{
    test : Date = new Date();
    focus;
    focus1;
    focus2;
    reset: ResetModel = {
        email: '',
        password: '',
        password_confirmation: '',
        token:''
    }

    email: string;

    constructor(
        private accountService: UserAccountService,
        private router: Router,
        private notifier: NotifierAppService,
        private route: ActivatedRoute
    ) { }
    ngOnInit(){
      this.reset.token = this.route.snapshot.paramMap.get('token');
      console.log("ResetComponent -> ngOnInit -> this.reset.token", this.reset.token)
    }
    
    resetPassword(){
        console.log("SignupComponent -> signUp -> this.signup", this.reset)
        this.accountService.createResetPassword(this.email).then((response) => {
        console.log("ResetComponent -> resetPassword -> response", response)
            if(response.email === 'We have e-mailed your password reset link!'){
              this.notifier.showSuccessNotification(response.email);
              this.router.navigateByUrl('/email-confirmation');
            }else{
              this.notifier.showErrorNotification(response.email);
            }
          },
          (err) => {
            this.notifier.showErrorNotification('Invalid Credentials');
            console.log('error:: ', err);
          });
    }
}
