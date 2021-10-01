import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {}

  dismiss(message) {

    this.modalController.dismiss('OK');
  }

}
