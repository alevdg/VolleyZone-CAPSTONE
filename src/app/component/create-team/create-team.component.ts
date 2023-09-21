import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/database.service';
import { AuthService } from '../../shared/auth.service';
import { iTeam } from '../../shared/teams';
import { iUser } from '../../shared/user';

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
    // No need to assign coachId here
  }

  createTeam(): void {
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
}
