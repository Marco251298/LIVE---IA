import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
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

    this.userSubject.subscribe({
      next: (_) => { }
    })



    this.afAuth.getRedirectResult().then((result) => {
      if (result.credential) {


        let user = {
          user: result.additionalUserInfo.profile
        }

        localStorage.setItem('user', JSON.stringify(user))
        this.userSubject.next('Agregado')


        this.router.navigate(['/dashboard/inicio',{logueado:true}])



      }
    })
  }

  async onGoogleLogin() {
    localStorage.setItem('cargando','cargando')
    try {
      await this.firebaseauthService.loginGoogle()
    } catch (err) {
    }
  }



}
