import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html',
  styleUrls: ['./transporte.component.scss'],
})
export class TransporteComponent implements OnInit {

  constructor(
    public modalController: ModalController
  ) {
    // this.getGeolocation();

  }
  public user;

  ngOnInit() {
    

  }


}
