import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {
 
  constructor( public afAuth: AngularFireAuth ) {}

  async loginGoogle(){
    try{
      return this.afAuth.signInWithRedirect( new firebase.auth.GoogleAuthProvider() )
      // return this.afAuth.getRedirectResult()
    }catch(err){
      console.log(err)
    }
  }
  logout() {
    return this.afAuth.signOut();
  }
  async getCredentials(){
   return this.afAuth.getRedirectResult()
  }
 

}
