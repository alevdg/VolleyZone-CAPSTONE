import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  email: string;
  password: string;
  successMessage: string; // Declare successMessage
  errorMessage: string;
  warningMessage: string; // Declare warningMessage

  constructor(public authService: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
    this.successMessage = '';
    this.errorMessage = '';
    this.warningMessage = '';
  }
  ngOnInit(): void { }

  signIn(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.authService.SignIn(this.email, this.password)
      .then(() => {
        console.log('User signed in successfully!');
        this.successMessage = 'User signed in successfully!'; // Set the success message

        // Display the success alert and then navigate to the landing page after 10 seconds
        setTimeout(() => {
          this.router.navigate(['/Dashboard']); // navigate to home page
        }, 10000);
      })
      .catch(error => {
        console.error(error);
        this.errorMessage = 'There was an error signing in. Please try again.';
        this.warningMessage = 'User not registered in the database';
      });

  }


}
