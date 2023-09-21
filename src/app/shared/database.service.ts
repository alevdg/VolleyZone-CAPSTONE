import { Injectable } from '@angular/core';
import { collectionData, collection, Firestore, doc, setDoc, docData, updateDoc, deleteDoc, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { iTeam } from './teams';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private teamsCollection;

  constructor(private firestore: Firestore) {
    this.teamsCollection = collection(this.firestore, 'teams');
  }

  createTeam(team: iTeam): Promise<void> {
    const teamRef = doc(this.firestore, 'teams') as DocumentReference<iTeam>;
    team.id = teamRef.id;
    return setDoc(teamRef, team);
  }

  getTeams(): Observable<iTeam[]> {
    return collectionData(this.teamsCollection, { idField: 'id' }) as Observable<iTeam[]>;
  }

  getTeamById(id: string): Observable<iTeam> {
    return docData(doc(this.firestore, 'teams', id)) as Observable<iTeam>;
  }

  updateTeam(id: string, team: iTeam): Promise<void> {
    return updateDoc(doc(this.firestore, 'teams', id) as DocumentReference<iTeam>, team);
  }

  deleteTeam(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'teams', id));
  }
}
