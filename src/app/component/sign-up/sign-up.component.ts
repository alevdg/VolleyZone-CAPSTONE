import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.errorMessage = '';
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  signUp() {
    if (this.registerForm.valid) {
      const { name, surname, email, password } = this.registerForm.value;
      this.authService.SignUp(email, password, name, surname)
        .then(() => {
          console.log('User signed up successfully!');
          this.router.navigate(['/Login']);
        })
        .catch(error => {
          console.error(error);
          this.errorMessage = 'There was an error signing up. Please try again.';
        });
    } else {
      this.errorMessage = 'Please fill in all fields.';
    }
  }
}
