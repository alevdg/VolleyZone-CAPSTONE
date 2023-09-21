export interface iUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified?: boolean;
}