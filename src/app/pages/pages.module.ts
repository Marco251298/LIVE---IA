import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

//Modulos
import { RouterModule } from '@angular/router';
// import { AngularFireModule } from '@angular/fire';
// import { environment } from 'src/environments/environment';
// import { AngularFirestoreModule } from '@angular/fire/firestore'
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireAuthModule } from '@angular/fire/auth';

//Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { RouteReuseStrategy } from '@angular/router';
import { DestinoComponent } from './destino/destino.component';
import { DestinoGuiadoComponent } from './destino-guiado/destino-guiado.component';
import { TransporteComponent } from './transporte/transporte.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ModalDestinationComponent } from './modal-destination/modal-destination.component';
import { LoadComponent } from './load/load.component';
import { PedritobotComponent } from './pedritobot/pedritobot.component';
import { SafePipe } from '../pipes/safe.pipe';

// import { OrdenarPorCantidadBusquedasPipe } from '../pipes/ordenar-por-cantidad-busquedas.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    DestinoComponent,
    DestinoGuiadoComponent,
    TransporteComponent,
    PerfilComponent,
    ModalDestinationComponent,
    LoadComponent,
    PedritobotComponent,
    SafePipe,
    // OrdenarPorCantidadBusquedasPipe

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    DashboardComponent,
    PagesComponent,
    RouterModule,
    SafePipe,
    // OrdenarPorCantidadBusquedasPipe

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],

})
export class PagesModule { }
