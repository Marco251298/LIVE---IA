import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DemoComponent } from 'src/app/pages/demo/demo.component';
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
    public modalController: ModalController,
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

  modalDemo(){
    this.presentModal()
  }

  async presentModal(  ) {

    const modal = await this.modalController.create({
      component: DemoComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    modal.onDidDismiss().then((_) => { });
    return await modal.present();
  }



}
