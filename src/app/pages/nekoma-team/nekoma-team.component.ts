import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { iTeam } from './../../shared/teams';
import { iUser } from './../../shared/user';
import { combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nekoma-team',
  templateUrl: './nekoma-team.component.html',
  styleUrls: ['./nekoma-team.component.scss']
})
export class NekomaTeamComponent {
  showNavAlert = false;

  constructor(private firestore: AngularFirestore) { }
  requestSent = {};

  confirmLeave() {
    if (window.confirm("Are you sure you want to leave the team?")) {
      // User clicked OK, add the logic for leaving the team here.
    } else {
      // User clicked Cancel, do nothing.
    }
  }

  sendRequest(id: string) {
    this.requestSent[id] = true;
  }

  openNavAlert(tabName: string) {
    this.showNavAlert = true;
    setTimeout(() => this.showNavAlert = false, 5000);  // Alert will disappear after 5 seconds
  }
}


