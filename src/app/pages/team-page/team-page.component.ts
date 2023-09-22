import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { iTeam } from './../../shared/teams';

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
    this.firestore.collection<iTeam>('Ftn8NLM9EE65oPlzMTMd').valueChanges().subscribe((teamMembers: iTeam[]) => {
      this.teamMembers = teamMembers;
    });
  }
}
