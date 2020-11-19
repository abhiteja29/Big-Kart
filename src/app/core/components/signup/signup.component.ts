import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authError: any;
  constructor(private firebaseService: AuthService) {}

  ngOnInit(): void {
    this.firebaseService.eventAuthError$.subscribe((data) => {
      this.authError = data;
    });
  }

  createUser(userRegInfoForm) {
    this.firebaseService.createUser(userRegInfoForm.value);
  }
}
