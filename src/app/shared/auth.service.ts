import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { iUser } from '../shared/user';
import { iTeam } from '../shared/teams';
import auth from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<iUser | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<iUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async SignIn(email: string, password: string) {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    const userDoc = this.afs.doc<iUser>(`users/${result.user?.uid}`);
    const user = await userDoc.valueChanges().pipe(take(1)).toPromise();
    const teamId = user?.teamId ?? '';
    if (teamId) {
      this.router.navigate(['Team']);
    } else {
      this.router.navigate(['Home']);
    }
    return this.updateUserData(result.user);
  }

  async SignUp(email: string, password: string, name: string, surname: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return this.updateUserData(result.user, name, surname);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false;
  }

  private updateUserData(user: any, name?: string, surname?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: iUser = {
      uid: user.uid,
      email: user.email,
      displayName: name && surname ? `${name} ${surname}` : user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      teamId: ''
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  async AuthLogin(provider: any) {
    const result = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['Home']);
    return this.updateUserData(result.user);
  }

  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['Login']);
  }

  getCurrentUser(): Observable<iUser | null | undefined> {
    return this.user$;
  }
}