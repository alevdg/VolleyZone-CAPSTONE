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
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<iUser>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);

    // Get the logged-in user's Firestore document
    const userDoc = this.afs.doc<iUser>(`users/${result.user?.uid}`);
    const user = await userDoc.valueChanges().pipe(take(1)).toPromise();

    // Update the team ID in the user's document
    const teamId = user?.teamId ?? '';

    // Redirect to the team page if the team ID is available
    if (teamId) {
      this.router.navigate(['Team']); // Replace 'team' with your actual team page route
    } else {
      this.router.navigate(['Home']);
    }

    return this.updateUserData(result.user);
  }


  // Sign up with email/password
  async SignUp(email: string, password: string, name: string, surname: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return this.updateUserData(result.user, name, surname);
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false;
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
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


  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    const result = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['Home']);
    return this.updateUserData(result.user);
  }

  // Sign out
  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['Login']);
  }

  // Get current user
  getCurrentUser(): Observable<iUser | null | undefined> {
    return this.user$;
  }
}
