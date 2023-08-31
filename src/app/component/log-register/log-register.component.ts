import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-log-register',
  templateUrl: './log-register.component.html',
  styleUrls: ['./log-register.component.scss']
})
export class LogRegisterComponent {
  private email: string;
  private password: string;
  private name: string;
  private surname: string;
  private role: string;

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password);
  }

  register() {
    this.authService.register(this.email, this.password, this.name, this.surname, this.role);
  }
}
