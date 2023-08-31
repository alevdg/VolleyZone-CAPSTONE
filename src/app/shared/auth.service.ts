import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) { }
  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  // register method
  register(email: string, password: string, name: string, surname: string, role: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      if (userCredential.user) {
        // Store additional user data in the database
        this.db.database.ref('users/' + userCredential.user.uid).set({
          email: email,
          id_user: userCredential.user.uid,
          name: name,
          surname: surname,
          role: role,
          id_role: role === 'coach' ? 101 : 100
        });
      }
      alert('Registration successful');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }

  // sign out method
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }


}



