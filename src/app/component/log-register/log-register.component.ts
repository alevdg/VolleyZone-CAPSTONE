// log-register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-log-register',
  templateUrl: './log-register.component.html',
  styleUrls: ['./log-register.component.scss']
})
export class LogRegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
  role: string = '';
  showLoginOverlay: boolean = false;
  showRegisterOverlay: boolean = false;

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password);
  }

  register() {
    this.authService.register(this.email, this.password, this.name, this.surname, this.role);
  }
}
