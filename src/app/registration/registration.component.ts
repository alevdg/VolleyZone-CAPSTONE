import { Component } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  email = '';
  password = '';
  name = '';
  surname = '';
  role = '';
  team = '';

  constructor(private registrationService: RegistrationService) { }

  async onSubmit() {
    try {
      await this.registrationService.register(
        this.email,
        this.password,
        this.name,
        this.surname,
        this.role,
        this.team
      );
      // handle successful registration
    } catch (error) {
      // handle registration error
    }
  }
}
