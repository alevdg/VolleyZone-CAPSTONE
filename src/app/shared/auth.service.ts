import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { iUser } from '../shared/user';
import auth from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
    this.router.navigate(['dashboard']);
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
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    const result = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['dashboard']);
    return this.updateUserData(result.user);
  }

  // Sign out
  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }

  // Get current user
  getCurrentUser(): Observable<iUser | null | undefined> {
    return this.user$;
  }
}
