import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../shared/team.service';
import { iTeam } from '../../shared/teams';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  teamsWithPendingRequests: iTeam[];

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.getTeamsWithPendingRequests();
  }

  getTeamsWithPendingRequests() {
    this.teamService.getTeamsWithPendingRequests().subscribe(teams => {
      this.teamsWithPendingRequests = teams;
    });
  }

  acceptJoinRequest(teamId: string, userId: string) {
    this.teamService.acceptJoinRequest(teamId, userId)
      .then(() => {
        console.log('Join request accepted');
        this.getTeamsWithPendingRequests();
      })
      .catch(error => {
        console.log('Error accepting join request:', error);
      });
  }

  rejectJoinRequest(teamId: string, userId: string) {
    this.teamService.rejectJoinRequest(teamId, userId)
      .then(() => {
        console.log('Join request rejected');
        this.getTeamsWithPendingRequests();
      })
      .catch(error => {
        console.log('Error rejecting join request:', error);
      });
  }
}
