import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public user;
  
  constructor( 
    private route:ActivatedRoute, 
    public firebaseauthService: FirebaseauthService,

    public toastController: ToastController,

    ) { }

  async ngOnInit() {
    if(this.route.snapshot.params.logueado==="true"){
       this.presentToast(`BIENVENIDO`)
    }
    localStorage.setItem('cargando','descargado')
    this.user = JSON.parse(localStorage.getItem('user'))

   

  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }



}
