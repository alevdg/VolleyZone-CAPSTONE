import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;

  constructor(public authService: AuthService) {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }
  ngOnInit(): void { }

  signIn(): void {
    this.authService.SignIn(this.email, this.password)
      .then(() => {
        console.log('User signed in successfully!');
      })
      .catch(error => {
        console.error(error);
        this.errorMessage = 'There was an error signing in. Please try again.';
      });
  }
}