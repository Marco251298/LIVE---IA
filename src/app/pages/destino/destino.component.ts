import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalDestinationComponent } from '../modal-destination/modal-destination.component';

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

  origin = { lat: -6.706316, lng: -79.906635 };
  destination = { lat: -6.706816, lng: -79.906701 };
  wayPoints: WayPoint[] = [
    // {
    //   location: { lat: -6.706816, lng: -79.906701 }, // Lugar X
    //   stopover: true,
    // },
  ];

  constructor(
    private route:ActivatedRoute,
    private toastController: ToastController,
    public modalController: ModalController,
    public router:Router
  ) { }
  ngOnInit() {

    console.log(this.route.snapshot)

    this.user = JSON.parse(localStorage.getItem('user'))
      console.log('Load map')
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
  async getGeolocation(message:any = '') {

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
    const error = (err) => {

      console.log(`Error ${err.code}: ${err.message}`);
    }
    n.geolocation.getCurrentPosition(success, error, options);
  }

  actualizar(){
    console.log(this.origin,this.destination)
    this.getGeolocation('nuevamente')
  }

}
