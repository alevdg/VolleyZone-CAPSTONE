import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { DatabaseService } from '../../shared/database.service';
import { docData } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isAdmin = false;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole(): void {
    this.authService.getCurrentUser().pipe(takeUntil(this.destroy$)).subscribe(currentUser => {
      docData(this.databaseService.getRoleDocument(currentUser.uid))
        .pipe(takeUntil(this.destroy$))
        .subscribe((role: any) => {
          this.isAdmin = role.admin;
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
