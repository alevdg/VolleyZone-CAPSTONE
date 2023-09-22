import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { iTeam } from './../../shared/teams';
import { iUser } from './../../shared/user';
import { combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-team',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent implements OnInit {
  teamMembers: iTeam[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getTeamMembers();
  }

  getTeamMembers(): void {
    this.firestore.doc<iTeam>('teams/Ftn8NLM9EE65oPlzMTMd').valueChanges().pipe(
      switchMap((team: iTeam | undefined) => {
        if (team) {
          // Fetch each team member's data from the 'users' collection
          const memberObservables = team.members.map(memberId =>
            this.firestore.doc<iUser>(`users/${memberId}`).valueChanges()
          );

          // Combine the Observables into one Observable that emits an array of user data
          return combineLatest(memberObservables);
        } else {
          return of([]);
        }
      })
    ).subscribe((teamMembers: iTeam[]) => {
      this.teamMembers = teamMembers;
    });
  }
}
