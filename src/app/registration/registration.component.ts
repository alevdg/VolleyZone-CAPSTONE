// registration.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  isCoach = false;

  constructor(private registrationService: RegistrationService) { }

  async onSubmit() {
    const role = this.isCoach ? 'coach' : 'player';
    try {
      await this.registrationService.register(
        this.email,
        this.password,
        this.name,
        this.surname,
        role
      );
      // handle successful registration
    } catch (error) {
      // handle registration error
    }
  }
}
