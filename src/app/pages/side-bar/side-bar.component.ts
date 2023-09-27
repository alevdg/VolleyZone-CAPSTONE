import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { DatabaseService } from '../../shared/database.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SidebarComponent {
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService
  ) { }

  openNav() {
    // Your code here to open the navigation
    console.log('Navigation opened');
  }

  onLogoClick() {
    // Your code here for when the logo is clicked
    console.log('Logo clicked');
  }

  onNewsClick() {
    // Your code here for when the News item is clicked
    console.log('News clicked');
  }

  onAccountSettingsClick() {
    // Your code here for when the Account Settings item is clicked
    console.log('Account Settings clicked');
  }

  onMessagesClick() {
    // Your code here for when the Messages item is clicked
    console.log('Messages clicked');
  }

  onNotificationsClick() {
    // Your code here for when the Notifications item is clicked
    console.log('Notifications clicked');
  }

  onAvatarClick() {
    // Your code here for when the Avatar is clicked
    console.log('Avatar clicked');
  }
}
