import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map,tap } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {


  public user$ = of(localStorage.getItem('credentials')).pipe( map(e => JSON.parse(e)),tap(e => console.log(e)) ) ;
  public user ;
  public name = '';
  public email = '';
  public esperar = 'false';
  constructor(
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestorageService,
    public firestorageService: FirestorageService,
    public afAuth: AngularFireAuth,
    public router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('credentials'))?.user;
    this.esperar = JSON.parse(localStorage.getItem('esperar'));
    if(!this.user$){
      this.esperar = 'true';
    }

    // // console.log('onIni')
    // if(localStorage.getItem('credentials')){

    //   this.user = JSON.parse(localStorage.getItem('credentials')).user
    //   this.name = this.user.displayName
    //   this.email = this.user.email
    // }
    // if(localStorage.getItem('credentials')){

    //   this.user = JSON.parse(localStorage.getItem('credentials')).user
    // }
      
    this.afAuth.getRedirectResult().then((result) => {
      
      if (result.credential) {
        console.log('logueado: ',result.credential)
        localStorage.setItem('credentials',JSON.stringify(result))
        // this.router.navigateByUrl('/');
        this.user = JSON.parse(localStorage.getItem('credentials')).user
        this.esperar = 'false'
        this.presentToast('USUARIO LOGUEADO')
        
      }
    })
  }

  async onGoogleLogin(){

    try{
      this.esperar = 'true';
      localStorage.setItem('esperar','true')
      this.firebaseauthService.loginGoogle()
    }catch(err){
      console.log(err)
    }
  }
  salir(){
    this.esperar = 'true';
    this.firebaseauthService.logout().then(res=> {
      localStorage.removeItem('credentials')
      setTimeout(()=>{
        this.name = '';
        this.email = '';
        this.user = null;
        this.esperar = 'false';

        this.presentToast('USUARIO DESLOGUEADO')
      },1000)
      
    
     

    } )
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      // cssClass: 'normal',
      duration: 2000
    });
    toast.present();
  }

 

}
