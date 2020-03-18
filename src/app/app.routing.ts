import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../services/auth/auth-guard.service';
import { LoginAuthGuardService } from '../services/auth/login-guard.service';

const routes: Routes =[
    { 
      path: '', 
      redirectTo: 'login', 
      pathMatch: 'full' 
    },
    { 
      path: 'login',          
      component: LoginComponent,
      // canActivate: [LoginAuthGuardService]
    },
    { 
      path: 'register',           
      component: SignupComponent,
      // canActivate: [LoginAuthGuardService]
    },
    { path: 'dashboard',             
      component: DashboardComponent,
      canActivate: [AuthGuardService]
    },
    { 
      path: 'user-profile',     
      component: ProfileComponent,
      canActivate: [AuthGuardService]
    },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
