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
export class TeamPageComponent {


  constructor(private firestore: AngularFirestore) { }

  confirmLeave() {
    if (window.confirm("Are you sure you want to leave the team?")) {
      // User clicked OK, add the logic for leaving the team here.
    } else {
      // User clicked Cancel, do nothing.
    }
  }
}
