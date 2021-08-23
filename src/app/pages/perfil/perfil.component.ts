import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable, of, Subject } from 'rxjs';
import { map,tap } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit,OnDestroy {


  // public user$ = of(localStorage.getItem('credentials')).pipe( map(e => JSON.parse(e)) ).subscribe( res => {
  //   console.log(res)
  // } ) ;

  public userSubject:Subject<any> = new Subject();
  snapObserver$: Observable<any> = new Observable();
  public user ;
  public name = '';
  public email = '';
  public mensajeEspera = '' ;

  constructor(
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestorageService,
    public firestorageService: FirestorageService,
    public afAuth: AngularFireAuth,
    public router: Router,
    private toastController: ToastController,
    private route:ActivatedRoute
  ) { 
    
    
  }
  
   
  

  ngOnInit() {

    if(!localStorage.getItem('credentials') && localStorage.getItem('loggin') == 'yes'){
      this.mensajeEspera = 'Espere....'
    }

    if(localStorage.getItem('credentials')){
      this.user = JSON.parse(localStorage.getItem('credentials')).user
    }


    this.afAuth.getRedirectResult().then((result) => {
      
      if (result.credential) {
        console.log('logueado: ',result.credential)
        localStorage.setItem('credentials',JSON.stringify(result))
        this.user = JSON.parse(localStorage.getItem('credentials')).user
        this.userSubject.next(JSON.parse(localStorage.getItem('credentials')))
        this.mensajeEspera = ''
        localStorage.setItem('loggin','no')

        this.presentToast('USUARIO LOGUEADO')
        // this.router.navigate(['/dashboard/inicio'])
        
      }
    })
  }

  async onGoogleLogin(){

    try{
      localStorage.setItem('loggin','yes')
      await this.firebaseauthService.loginGoogle()
    }catch(err){
      console.log(err)
    }
  }
  salir(){
    this.mensajeEspera = 'Espere....'
    this.firebaseauthService.logout().then(res=> {
      localStorage.removeItem('credentials')
      setTimeout(()=>{
        this.name = '';
        this.email = '';
        this.user = null;
        this.mensajeEspera = ''
        localStorage.setItem('deslogueo','true')
        this.presentToast('USUARIO DESLOGUEADO'); 
        // location.reload();
      },1000)
      
    
     

    } )
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ngOnDestroy(){
    this.userSubject.unsubscribe()
  }

 

}
