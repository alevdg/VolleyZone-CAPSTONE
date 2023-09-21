import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/database.service';
import { iTeam } from '../../shared/teams';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams: iTeam[] = [];

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.getTeams().subscribe(changes => {
      this.teams = changes.map((change: any) => change.payload.doc.data() as iTeam);
    });
  }
}
