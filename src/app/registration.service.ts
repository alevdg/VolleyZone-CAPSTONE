import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  async register(
    email: string,
    password: string,
    name: string,
    surname: string,
    role: string
  ) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (result.user) {
        await this.firestore
          .collection('users')
          .doc(result.user.uid)
          .set({
            name,
            surname,
            role,
          });
        // handle successful registration
      } else {
        // handle null user
      }
    } catch (error) {
      // handle registration error
    }
  }
}
