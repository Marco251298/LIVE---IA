import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

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
  // lugaresFiltro = []
  textoVoz = '';
  hablandoPersona = false;
  recognition = new webkitSpeechRecognition();
  textAunNoSeleccionado = ''

  lugares: any[] = [
    {
      nombre: 'Puerta principal',
      lat: -6.706316,
      lng: -79.906635
    },
    {
      nombre: 'Plaza del saber',
      lat: -6.706816,
      lng: -79.906701
    },
    {
      nombre: 'Baños',
      lat: -6.707871,
      lng: -79.906926
    },
    {
      nombre: 'Librería universitaria',
      lat: -6.707828,
      lng: -79.907691
    },
    {
      nombre: 'Facultad de derecho',
      lat: -6.707264,
      lng: -79.908378
    },
    {
      nombre: 'Biblioteca de derecho',
      lat: -6.706867,
      lng: -79.908543
    },
    {
      nombre: 'Facultad de enfermería',
      lat: -6.706712,
      lng: -79.908453
    },
    {
      nombre: 'Biblioteca central',
      lat: -6.707779,
      lng: -79.905972
    },
    {
      nombre: 'Coliseo',
      lat: -6.707324,
      lng: -79.905458
    },
    {
      nombre: 'Rectorado',
      lat: -6.707202,
      lng: -79.906034
    },
    {
      nombre: 'Laboratorios EPICI',
      lat: -6.707363,
      lng: -79.909186
    },
    {
      nombre: 'Facultad de agronomía',
      lat: -6.707486,
      lng: -79.909177
    },
    {
      nombre: 'Facultad de ingeniería agrícola',
      lat: -6.707679,
      lng: -79.908692
    },
    {
      nombre: 'FIQIA',
      lat: -6.708193,
      lng: -79.908568
    },

  ];
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

  ) {
    this.recognition.lang = 'es-ES';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
  }

  ngOnInit() {
     
    this.lugaresEncontrados = this.lugares
    this.recognition.onresult = (event)=>{
      const results = event.results;
   
      // for (let index = 0; index < results.length; index++) {
      //     this.textoVoz = results[index][0].transcript
      // }
      this.textoVoz = results[event.results.length-1][0].transcript
      console.log(this.textoVoz)
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

    console.log(textSearch)

    let lugaresFiltro = []
    if (textSearch.length > 0) {

      this.lugares.forEach(lugar => {
        console.log(lugar)
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
    this.lugarSeleccionado = lugar;
    this.lugaresEncontrados = [lugar];
    this.presentToast('SELECCIONADO')

  }
  onCancel($event) {
    this.lugaresEncontrados = this.lugares
  }
  activarVoz() {
    this.recognition.start();
    this.hablandoPersona = true;
  }

  pararVoz() {
    this.recognition.abort();
    this.hablandoPersona = false;
  }
  
  cerrarModal(){
    if(this.lugarSeleccionado == null){
      this.presentToast('AUN NO SELECCIONA LUGAR')
    }else{

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