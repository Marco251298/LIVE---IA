import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/app'
import { of } from 'rxjs';
import { map,take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public afAuth: AngularFireAuth, 
       public router: Router,
       public toastController:ToastController
    ) {

  }

  async loginGoogle() {
    try {
      return this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      // return this.afAuth.getRedirectResult()
    } catch (err) {
      console.log(err)
    }
  }
  logout() {
    localStorage.removeItem('user')
    this.presentToast('Usuario deslogueado')
    return this.afAuth.signOut();
  }


  getCredentials() {
    return this.afAuth.user.pipe(map((data) => {
      if (data) {
        // console.log(user)
        let user = {
          nombre:data.displayName,
          email:data.email,
          photo:data.photoURL
        }
        localStorage.setItem('user',JSON.stringify(user))
        return true;
      }
      this.presentToast('Debe estar logueado')
      this.router.navigateByUrl('/login');
    }), 
    take(1));
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


}
