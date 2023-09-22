import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { iTeam } from './../../shared/teams'; // Replace with the actual path to your team member model

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
    this.firestore.collection<iTeam>('team').valueChanges().subscribe((teamMembers: iTeam[]) => {
      this.teamMembers = teamMembers;
    });
  }
}
