import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { DatabaseService } from '../../shared/database.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SidebarComponent {
  isAdmin = false;
  showSignOutAlert = false;

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
    private router: Router
  ) { }


  signOut() {
    this.authService.SignOut().then(() => {
      this.showSignOutAlert = true;

      setTimeout(() => {
        this.router.navigate(['Login']);
      }, 6000);  // Wait for 6 seconds
    });

  }
}
