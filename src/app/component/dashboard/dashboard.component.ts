import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

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

  constructor(public authService: AuthService) { }

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
}
