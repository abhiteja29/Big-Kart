import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from "shared/services/auth-guard.service";
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SupportComponent } from './components/support/support.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { 
        path: 'my/profile', 
        component: MyprofileComponent, 
        canActivate: [AuthGuard]
      },
      { 
        path: 'sign-up', 
        component: SignupComponent, 
        
      },
      { 
        path: 'reset-password', 
        component: ForgotPasswordComponent, 
        
      },
      { 
        path: 'support', 
        component: SupportComponent, 
        
      }
    ])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    MyprofileComponent,
    SignupComponent,
    ForgotPasswordComponent,
    SupportComponent,        
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
