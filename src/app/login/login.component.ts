import { Component } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { UserAccountService } from '../../services/user/user-account.service';
import { Router } from '@angular/router';
import { NotifierAppService } from '../../services/notifier/notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  login: LoginModel = {
    email: '',
    password: ''
  }
  
  constructor(
    private accountService: UserAccountService,
    private router: Router,
    private notifier: NotifierAppService
    ) { }
    
  onSubmit(){
    
    this.accountService.login(this.login).subscribe((response:boolean) => {
      if(response){
        this.notifier.showSuccessNotification('Login Successful');
        this.router.navigateByUrl('/dashboard');
      }else{
        this.notifier.showErrorNotification('Invalid Credentials');
      }
    },
    (err) => {
      console.log('error:: ', err);
    });
  }

}
