import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../services/auth/auth-guard.service';
import { AuthService } from '../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserAccountService } from '../services/user/user-account.service';
import { NotifierAppService } from '../services/notifier/notifier.service';
import { NotifierModule } from 'angular-notifier';
import { LoginAuthGuardService } from '../services/auth/login-guard.service';
import { NgbdTabsetBasicModule } from './modals/link-details-modal/modal.module';
import { NewLinkModalModule } from './modals/new-link-modal/modal.module';
// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as Zune from 'fusioncharts/themes/fusioncharts.theme.zune';
import * as Maps from 'fusioncharts/fusioncharts.maps';
import * as Worldwithcountries from 'fusioncharts/maps/fusioncharts.worldwithcountries'
import * as World from 'fusioncharts/maps/fusioncharts.world';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { ResetComponent } from './reset-password/reset.component';
import { ResetPasswordComponent } from './password-input/password-input.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
FusionChartsModule.fcRoot(FusionCharts, Charts, Zune, Maps, World, Worldwithcountries, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    ResetComponent,
    ResetPasswordComponent,
    EmailConfirmComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    NotifierModule,
    NgbdTabsetBasicModule,
    NewLinkModalModule,
    FusionChartsModule
  ],
  providers: [ 
    AuthGuardService, 
    AuthService, 
    UserAccountService,
    NotifierAppService,
    LoginAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
