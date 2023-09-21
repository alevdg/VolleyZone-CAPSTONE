import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iTeam } from './teams';
import { switchMap } from 'rxjs/operators';
import { arrayUnion, arrayRemove } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  // ...

  // Send a join request to a team
  sendJoinRequest(teamId: string): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const userId = user.uid;
        return this.afs.doc(`teams/${teamId}`).update({
          pendingRequests: arrayUnion(userId)
        });
      } else {
        return Promise.reject('User not logged in');
      }
    });
  }

  getTeamById(id: string): Observable<iTeam> {
    return this.afs.doc<iTeam>(`teams/${id}`).valueChanges();
  }

  // Accept a join request for a team
  acceptJoinRequest(teamId: string, userId: string): Promise<void> {
    return this.afs.doc(`teams/${teamId}`).update({
      joinRequests: arrayRemove({ userId, status: 'pending' }),
      members: arrayUnion(userId)
    });
  }

  // Reject a join request for a team
  rejectJoinRequest(teamId: string, userId: string): Promise<void> {
    return this.afs.doc(`teams/${teamId}`).update({
      joinRequests: arrayRemove({ userId, status: 'pending' })
    });
  }

  // Get teams with pending join requests
  getTeamsWithPendingRequests(): Observable<iTeam[]> {
    return this.afs.collection<iTeam>('teams', ref =>
      ref.where('joinRequests', 'array-contains', { status: 'pending' })
    ).valueChanges();
  }

  // Get teams that the current user belongs to, including the pending state
  getTeamsWithPendingState(): Observable<iTeam[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const userId = user.uid;
          return this.afs.collection<iTeam>('teams', ref =>
            ref.where('members', 'array-contains', userId)
          ).valueChanges();
        } else {
          // Return an empty array if user is not logged in
          return of([]);
        }
      })
    );
  }
}
