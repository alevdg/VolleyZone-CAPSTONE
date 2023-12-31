import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../shared/team.service';
import { iTeam } from '../../shared/teams';


@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent {
  teamId: string;
  team: iTeam | undefined;
  isPending: boolean = false;

  // in progress

  // implements OnInit
  // constructor(
  //   private route: ActivatedRoute,
  //   private teamService: TeamService
  // ) { }

  // ngOnInit() {
  //   this.teamId = this.route.snapshot.paramMap.get('id');
  //   this.getTeamDetail();
  //   this.checkPendingState();
  // }

  // getTeamDetail() {
  //   this.teamService
  //     .getTeamById(this.teamId)
  //     .subscribe(team => (this.team = team));
  // }

  // checkPendingState() {
  //   this.teamService
  //     .getTeamsWithPendingState()
  //     .subscribe(teams => {
  //       const teamsWithPending = teams.filter(team =>
  //         team.joinRequests.some(request =>
  //           request.userId === this.teamId && request.status === 'pending'
  //         )
  //       );
  //       this.isPending = teamsWithPending.length > 0;
  //     });
  // }

  // sendJoinRequest() {
  //   this.teamService.sendJoinRequest(this.teamId)
  //     .then(() => {
  //       console.log('Join request sent');
  //       this.isPending = true;
  //     })
  //     .catch(error => {
  //       console.log('Error sending join request:', error);
  //     });
  // }
}
