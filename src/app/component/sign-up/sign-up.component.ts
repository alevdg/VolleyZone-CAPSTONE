import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  name = new FormControl('');
  surname = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  errorMessage: string;
  terms = new FormControl(false);

  constructor(public authService: AuthService) {
    this.errorMessage = '';
  }

  ngOnInit() { }

  signUp(): void {
    // Check if name, surname, email, and password are not empty
    if (this.name.value.trim() === '' || this.surname.value.trim() === '' || this.email.value.trim() === '' || this.password.value.trim() === '') {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Check if terms of service are agreed
    if (!this.terms.value) {
      this.errorMessage = 'You must agree to the terms of service.';
      return;
    }

    this.authService.SignUp(this.email.value, this.password.value, this.name.value, this.surname.value)
      .then(() => {
        console.log('User signed up successfully!');
      })
      .catch(error => {
        console.error(error);
        this.errorMessage = 'There was an error signing up. Please try again.';
      });
  }
}
