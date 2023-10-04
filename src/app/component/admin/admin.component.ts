import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../shared/team.service';
import { DatabaseService } from '../../shared/database.service';
import { getDocs, doc, deleteDoc } from 'firebase/firestore';

import { iTeam } from '../../shared/teams';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  teamsWithPendingRequests: iTeam[];
  teamMembers: any[] = [];


  // in progress
  // implements OnInit

  //   constructor(private teamService: TeamService, private databaseService: DatabaseService) { }

  //   ngOnInit() {
  //     this.getTeamsWithPendingRequests();
  //     this.getTeamMembers();
  //   }

  //   getTeamsWithPendingRequests() {
  //     this.teamService.getTeamsWithPendingRequests().subscribe(teams => {
  //       this.teamsWithPendingRequests = teams;
  //     });
  //   }

  //   acceptJoinRequest(teamId: string, userId: string) {
  //     this.teamService.acceptJoinRequest(teamId, userId)
  //       .then(() => {
  //         console.log('Join request accepted');
  //         this.getTeamsWithPendingRequests();
  //       })
  //       .catch(error => {
  //         console.log('Error accepting join request:', error);
  //         alert('Error accepting join request: ' + error);
  //       });
  //   }

  //   rejectJoinRequest(teamId: string, userId: string) {
  //     this.teamService.rejectJoinRequest(teamId, userId)
  //       .then(() => {
  //         console.log('Join request rejected');
  //         this.getTeamsWithPendingRequests();
  //       })
  //       .catch(error => {
  //         console.log('Error rejecting join request:', error);
  //         alert('Error rejecting join request: ' + error);
  //       });
  //   }

  //   getTeamMembers(): void {
  //     getDocs(this.databaseService.getTeamMembersCollection())
  //       .then((querySnapshot) => {
  //         this.teamMembers = querySnapshot.docs.map(doc => doc.data());
  //       });
  //   }

  //   removeMember(memberId: string): void {
  //     deleteDoc(doc(this.databaseService.getTeamMembersCollection(), memberId))
  //       .catch(error => {
  //         console.error('Error removing member: ', error);
  //         alert('Error removing member: ' + error);
  //       });
  //   }
}

