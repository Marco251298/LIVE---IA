import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
// import { lugares } from '../destinos';

declare const webkitSpeechRecognition: any;


@Component({
  selector: 'app-modal-destination',
  templateUrl: './modal-destination.component.html',
  styleUrls: ['./modal-destination.component.scss'],
})
export class ModalDestinationComponent implements OnInit {

  @Input() objetivomodal;
  searchbar = document.querySelector('ion-searchbar');
  modoRuta = 'maparuta';
  lugarSeleccionado = null;
  textoVoz = '';
  hablandoPersona = false;
  recognition = new webkitSpeechRecognition();
  textAunNoSeleccionado = '';
  lugares: any[] = [];
  primeravez = false;

  textos: string[] = [
    `
    En el modo ruta podrás apreciar el mapa y a la vez la ruta mas corta entre los dos,
    podras seleccionar entre vista normal y satelital
    `,
    `
    En el modo direcciones te mostraremos que pasos seguir para poder llegar a ese sitio
    de destino, hacia donde debes dirigirte, el tiempo y la distancia
    `
  ]
  textoExplicacion = this.textos[0];
  lugaresEncontrados = [];
  constructor(
    public modalController: ModalController,
    private toastController: ToastController,
    private db: AngularFirestore
  ) {
    this.recognition.lang = 'es-ES';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;

  }
  ngOnInit() {

    this.db.collection('lugares').valueChanges({idField: 'id'})
   
      .subscribe(resp => {
        this.lugares = resp
        
        console.log(this.lugares)
      })

      this.recognition.onresult = (event) => {
        const results = event.results;
        this.textoVoz = results[event.results.length - 1][0].transcript
        this.pararVoz()
        this.presentToast('FRASE DETECTADA, PUEDE DETENER GRABACION')

      }


  }
  dismiss(message) {
    let data = {}
    if (this.objetivomodal == 'tour') {
      data = {
        message: message,
        dismissed: true,
        lugar: this.lugarSeleccionado,
      }
    } else {
      data = {
        message: message,
        dismissed: true,
        lugar: this.lugarSeleccionado,
        modoruta: this.modoRuta
      }
    }
    this.modalController.dismiss(data);
  }
  handleInput(event) {
    this.lugarSeleccionado = null
    this.lugaresEncontrados = this.lugares;
    let textSearch = event.target.value
    let lugaresFiltro = []
    if (textSearch.length > 0) {

      this.lugares.forEach(lugar => {
        if (lugar.nombre.toLowerCase().includes(textSearch.toLowerCase())) {
          lugaresFiltro.push(lugar);
        }

      });
      this.lugaresEncontrados = lugaresFiltro
    }
  }
  cambiarModoVista(event) {
    this.modoRuta = event.target.value
    switch (this.modoRuta) {
      case 'maparuta': this.textoExplicacion = this.textos[0]; break;
      case 'direcciones': this.textoExplicacion = this.textos[1]; break;

    }
  }
  selectLugar(lugar) {
    if (this.lugarSeleccionado == null) {

      this.lugarSeleccionado = lugar;
      this.lugaresEncontrados = [lugar];
      this.presentToast('SELECCIONADO')
    }
  }
  onCancel($event) {
    this.lugaresEncontrados = this.lugares
  }
  cancel(){
    this.lugaresEncontrados = []
    this.lugarSeleccionado = null
  }

  activarVoz() {

    this.recognition.start();
    this.hablandoPersona = true;
  }

  pararVoz() {
    this.recognition.abort();
    this.hablandoPersona = false;
  }

  cerrarModal() {
    if (this.lugarSeleccionado == null) {
      this.presentToast('AUN NO SELECCIONA LUGAR')
    } else {
      localStorage.setItem('lugarSeleccionado',JSON.stringify(this.lugarSeleccionado))
      this.dismiss('ok')
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
}
