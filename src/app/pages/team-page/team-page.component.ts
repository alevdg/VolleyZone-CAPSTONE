import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-team',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent implements OnInit {
  teamMembers: any[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getTeamMembers();
  }

  getTeamMembers(): void {
    this.firestore.collection('team').valueChanges().subscribe((teamMembers: any[]) => {
      this.teamMembers = teamMembers;
    });
  }
}
