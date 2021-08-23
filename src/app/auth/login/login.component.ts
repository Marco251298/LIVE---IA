import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public userSubject: Subject<any> = new Subject();

  constructor(
    public firebaseauthService: FirebaseauthService,
    public toastController: ToastController,
    public afAuth: AngularFireAuth,
    public router: Router,


  ) { }
  cargando(){
    return localStorage.getItem('cargando') === 'cargando'?true:false
  }

  ngOnInit() {
    console.log(localStorage.getItem('cargando'),'cargando')



    this.userSubject.subscribe({
      next: (v) => {
        console.log(v)
        
      }
    })



    this.afAuth.getRedirectResult().then((result) => {
      console.log('producto del login')
      
      if (result.credential) {


        let user = {
          user: result.additionalUserInfo.profile
        }

        localStorage.setItem('user', JSON.stringify(user))
        this.userSubject.next('Agregado')
        
        // setTimeout(()=>{

        //   this.presentToast(`BIENVENIDO`)
        // } ,500)

        this.router.navigate(['/dashboard/inicio',{logueado:true}])
       
        
        
      }
    })
  }

  async onGoogleLogin() {
    localStorage.setItem('cargando','cargando')
    try {
      await this.firebaseauthService.loginGoogle()
    } catch (err) {
      console.log(err)
    }
  }

  

}
