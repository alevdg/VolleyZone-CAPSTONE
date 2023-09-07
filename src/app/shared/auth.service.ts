import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private fireauth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then((result) => {
      this.handleAuthentication(result.user?.email, result.user?.uid, result.user?.refreshToken, result.user?.ma);
      this.router.navigate(['dashboard']);
    }, err => {
      console.error(err.message);
      this.router.navigate(['/login']);
    })
  }

  // register method
  register(email: string, password: string, name: string, surname: string, role: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      if (userCredential.user) {
        // Store user data in the database
        this.storeUserData(userCredential.user.uid, email, name, surname, role);
      }
      console.log('Registration successful');
      this.router.navigate(['/login']);
    }, err => {
      console.error(err.message);
      this.router.navigate(['/register']);
    });
  }

  // Store user data in the database
  private storeUserData(userId: string, email: string, name: string, surname: string, role: string) {
    this.firestore.collection('users').doc(userId).set({
      email: email,
      id_user: userId,
      name: name,
      surname: surname,
      role: role,
      id_role: role === 'coach' ? 101 : 100
    });
  }

  // sign out method
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
      this.router.navigate(['/login']);
    }, err => {
      console.error(err.message);
      this.router.navigate(['/login']);
    })
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string | null | undefined, userId: string | null | undefined, token: string | null | undefined, expiresIn: number | undefined) {
    const expirationDate = new Date(new Date().getTime() + expiresIn! * 1000);
    const user = { email, id: userId, _token: token!, _tokenExpirationDate: expirationDate };
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn! * 1000);
  }
}
