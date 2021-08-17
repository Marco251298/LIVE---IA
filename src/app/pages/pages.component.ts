import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../services/firebaseauth.service';
import firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  public stopLoading;
  constructor(
    private firebaseauthService: FirebaseauthService,
    public afAuth: AngularFireAuth,
    public router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  
    
    // this.afAuth.getRedirectResult().then((result) => {
      
    //   if (result.credential) {
    //     console.log('logueado: ',result.credential)
    //     localStorage.setItem('credentials',JSON.stringify(result))
    //     // this.router.navigateByUrl('/');
    //     this.presentToast('USUARIO LOGUEADO')
        
    //   }
    // })
  }
  // async presentToast(msg: string) {
  //   const toast = await this.toastController.create({
  //     message: msg,
  //     // cssClass: 'normal',
  //     duration: 2000
  //   });
  //   toast.present();
  // }



}
