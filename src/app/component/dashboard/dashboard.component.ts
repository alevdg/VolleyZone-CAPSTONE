import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  showGroups = false;
  showTrainings = false;
  showPhotos = false;
  showComments = false;
  comment = '';
  savedComment = '';

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void { }

  toggleGroups() {
    this.showGroups = !this.showGroups;
  }

  toggleTrainings() {
    this.showTrainings = !this.showTrainings;
  }

  togglePhotos() {
    this.showPhotos = !this.showPhotos;
  }

  saveComment() {
    this.savedComment = this.comment;
    localStorage.setItem('comment', this.comment);
    this.comment = '';
    this.showComments = false;
  }

  redirectToTeamPage() {
    this.router.navigate(['/Team']);
  }

}
