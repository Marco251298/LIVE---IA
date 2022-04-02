import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DemoComponent } from '../demo/demo.component';
import { ModalDestinationComponent } from '../modal-destination/modal-destination.component';
//import { ModalDestinationComponent2 } from '../modal-destination/modal-destination.componente1';

declare var google;

interface WayPoint {
  location: {
    lat: number,
    lng: number,
  };
  stopover: boolean;
}
const d = document, n = navigator



@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.scss'],
})
export class DestinoComponent implements OnInit {

  public user;
  map: any;
  openGeoLocation = false;
  mensajeCambiarLugar = ''

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  origin = { lat: -6.779531882589856, lng: -79.84473182899671 }; //lat: -6.779531882589856, lng: -79.84473182899671
  destination = { lat: -6.763287941140208, lng: -79.83811883560287 }; //lat: 6.763287941140208, lng: -79.83811883560287
  wayPoints: WayPoint[] = [

  ];

  constructor(
    private toastController: ToastController,
    public modalController: ModalController,
    public router:Router,
    public firestoreService: FirestoreService
  ) { }
  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'))
      this.getGeolocation();
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);


    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });

  }

  private calculateRoute() {
    var responseVar;
    if (localStorage.getItem('rutaguardada') && this.mensajeCambiarLugar.length == 0 && this.openGeoLocation == false) {
      responseVar = JSON.parse(localStorage.getItem('rutaguardada'))
      responseVar['routes'].forEach(element => {
        element.warnings = []
      });
      this.directionsDisplay.setDirections(responseVar);
      this.mensajeCambiarLugar = ''

    } else {
      this.openGeoLocation = false;
      this.directionsService.route({
        origin: this.origin,
        destination: this.destination,
        waypoints: this.wayPoints,
        optimizeWaypoints: false,
        travelMode: 'WALKING',
        avoidFerries: false
      }, (response, status) => {

        responseVar = response
        responseVar['routes'].forEach(element => {
          element.warnings = []
        });
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(responseVar);
          localStorage.setItem('rutaguardada',JSON.stringify(responseVar))

          //Agregamos la cantidad del sitio buscado


          if(JSON.parse(localStorage.getItem('lugarSeleccionado'))){
            let lugarSeleccionado = JSON.parse(localStorage.getItem('lugarSeleccionado'))

            this.firestoreService.udpateDoc(lugarSeleccionado.cantbusquedas,'lugares',lugarSeleccionado.id).then( _=>{
              this.presentToast('Busqueda completa')
              localStorage.removeItem('lugarSeleccionado')
            } )

          }


        } else {
          alert('Could not display directions due to: ' + status);
        }
      })
    }

  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentUbicacion() {
    const modal = await this.modalController.create({
      component: ModalDestinationComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N',
      }
    });
  }

  async presentModal(  ) {

    const modal = await this.modalController.create({
      component: ModalDestinationComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null && modelData.data != null && modelData.data.lugar != null) {

        if (modelData.data.message == 'ok') {
           this.getGeolocation('cambiarLugar',)
          this.destination = {
            lat: modelData.data.lugar.lat,
            lng: modelData.data.lugar.lng
          }
          this.mensajeCambiarLugar = 'cambiarLugar'
          this.getGeolocation('nuevamente')
        }
      }
    });
    return await modal.present();
  }
  async getGeolocation(message:string = '') {

    this.openGeoLocation = true;
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    const success = (position) => {
      this.origin = { lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) };
      if(message == 'nuevamente'){
        this.calculateRoute()
      }else{
        this.loadMap();
      }
    }
    const error = (_) => { }
    n.geolocation.getCurrentPosition(success, error, options);
  }

  actualizar(){
    this.getGeolocation('nuevamente')
  }

  modalDemo(){
    this.presentModalDemo()
  }

  async presentModalDemo(  ) {

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
    modal.onDidDismiss().then((_) => {
    });
    return await modal.present();
  }

}
