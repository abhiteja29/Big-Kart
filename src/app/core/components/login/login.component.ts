import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: AuthService) { 
  }

  logInUser(logInForm) { 
    this.auth.logInUser(
      logInForm.value.inputEmail,
      logInForm.value.inputPassword
    );
  }

  
}
