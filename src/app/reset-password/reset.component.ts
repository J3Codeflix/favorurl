import { Component, OnInit } from '@angular/core';
import { SignUpModel } from '../../models/signup.model';
import { UserAccountService } from '../../services/user/user-account.service';
import { Router, ActivatedRoute, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { NotifierAppService } from '../../services/notifier/notifier.service';
import { ResetModel } from '../../models/reset.model';

@Component({
    selector: 'app-signup',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit{
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
        this.accountService.resetPassword(this.reset).then((response) => {
        console.log("ResetComponent -> resetPassword -> response", response)
            if(response.id){
              this.notifier.showSuccessNotification('Password Reset Successful');
              this.router.navigateByUrl('/login');
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
