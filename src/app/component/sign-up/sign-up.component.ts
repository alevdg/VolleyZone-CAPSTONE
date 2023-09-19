import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  name: string;
  surname: string;
  email: string;
  password: string;
  errorMessage: string;

  constructor(public authService: AuthService) {
    this.name = '';
    this.surname = '';
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }

  ngOnInit() { }

  signUp(): void {
    // Check if name, surname, email, and password are not empty
    if (this.name.trim() === '' || this.surname.trim() === '' || this.email.trim() === '' || this.password.trim() === '') {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.authService.SignUp(this.email, this.password, this.name, this.surname)
      .then(() => {
        console.log('User signed up successfully!');
      })
      .catch(error => {
        console.error(error);
        this.errorMessage = 'There was an error signing up. Please try again.';
      });
  }
}