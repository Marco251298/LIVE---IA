import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PayloadDestino } from 'src/app/models/payloaddestino';
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

  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();


  //-6.602205, -78.621229
  //-6.602210368959859, -78.6211556357814

  origin = { lat: -6.706316, lng: -79.906635 };

  destination = { lat: -6.706816, lng: -79.906701 };
  // origin = {lat: -6.602205, lng:-78.621229  };

  // destination = { lat: -6.602210368959859, lng: -78.6211556357814 };
  wayPoints: WayPoint[] = [
    // {
    //   location: { lat: -6.706816, lng: -79.906701 }, // Jardín Botánico
    //   stopover: true,
    // },
    // {
    //   location: { lat: 4.676802158355713, lng: -74.04825592041016 }, // Parque la 93
    //   stopover: true,
    // },
    // {
    //   location: { lat: 4.6554284, lng: -74.1094989}, // Maloka
    //   stopover: true,
    // },
  ];


  constructor(
    public modalController: ModalController
  ) {
    // this.getGeolocation();

  }
  public user;

  ngOnInit() {
    if (localStorage.getItem('credentials')) {
      this.user = JSON.parse(localStorage.getItem('credentials')).user
      console.log('Load map')
      this.loadMap();
    }

  }
  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    // create map
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
    // console.log(this.map)

  }

  private calculateRoute(additional:string = '') {
    var responseVar;
    if (localStorage.getItem('rutaguardada') && additional.length == 0) {
      console.log('lo haces desde storage')
      responseVar = JSON.parse(localStorage.getItem('rutaguardada'))
      this.directionsDisplay.setDirections(responseVar);

    } else {

      console.log('calculate route')
      this.directionsService.route({
        origin: this.origin,
        destination: this.destination,
        waypoints: this.wayPoints,
        optimizeWaypoints: false,
        travelMode: 'WALKING',
        avoidFerries: false
      }, (response, status) => {
        // console.log(response)
        responseVar = response
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(responseVar);
          localStorage.setItem('rutaguardada',JSON.stringify(responseVar))
        } else {
          alert('Could not display directions due to: ' + status);
        }
      })
    }

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
        console.log('Modal Data dismissed message: ' + modelData.data.message);
        console.log('Modal Data dismissed dissmised: ' + modelData.data.dismissed);
        console.log('Modal Data dismissed lugar nombre: ' + modelData.data.lugar.nombre);
        console.log('Modal Data dismissed lugar lng: ' + modelData.data.lugar.lng);
        console.log('Modal Data dismissed lugar lat: ' + modelData.data.lugar.lat);
        console.log('Modal Data dismissed modoruta: ' + modelData.data.modoruta);
        console.log('Modal Data dismissed imagen: ' + modelData.data.lugar.img);
        if (modelData.data.message == 'ok') {

          this.destination = {
            lat: modelData.data.lugar.lat,
            lng: modelData.data.lugar.lng
          }
          this.calculateRoute('cambiarLugar');
        }
      }
    });
    return await modal.present();
  }

  public getGeolocation() {


    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = (position) => {



      console.log(position);
      this.origin = { lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) };
    }

    const error = (err) => {

      console.log(`Error ${err.code}: ${err.message}`);
    }

    n.geolocation.getCurrentPosition(success, error, options);


  }

}
