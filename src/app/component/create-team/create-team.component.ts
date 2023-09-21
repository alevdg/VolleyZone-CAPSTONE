import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/database.service';
import { AuthService } from '../../shared/auth.service';
import { iTeam } from '../../shared/teams';
import { iUser } from '../../shared/user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {
  team: iTeam = {
    name: '',
    description: ''
  };

  constructor(private databaseService: DatabaseService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  createTeam(): void {
    this.authService.getCurrentUser().pipe(take(1)).subscribe(user => {
      if (user) {
        const adminId = user.uid;
        this.team.admin = adminId;

        this.databaseService.createTeam(this.team)
          .then(() => {
            console.log('Team created with ID: ', this.team.id);
            this.team = {
              name: '',
              description: ''
            }; // Clear the form after creating the team
          })
          .catch(error => {
            console.error('Error creating team:', error);
          });
      }
    });
  }
}
