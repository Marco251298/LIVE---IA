import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DestinoComponent } from './destino/destino.component';
import { DestinoGuiadoComponent } from './destino-guiado/destino-guiado.component';
import { TransporteComponent } from './transporte/transporte.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PedritobotComponent } from './pedritobot/pedritobot.component';
import { TourPosgradoComponent } from './tours/tour-posgrado/tour-posgrado.component';
import { TourGradosYTitulosComponent } from './tours/tour-grados-ytitulos/tour-grados-ytitulos.component';
import { TourFacultadComponent } from './tours/tour-facultad/tour-facultad.component';

const childRoutes:Routes = [
  { path: '', redirectTo:'inicio'},

  { path: 'inicio', component: DashboardComponent, data: { titulo: 'Inicio' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },
  { path: 'destino', component: DestinoComponent, data: { titulo: 'Destino' } },
  { path: 'pedritobot', component: PedritobotComponent, data: { titulo: '¿Mas acerca de nuestra UNPRG?' } },
  { path: 'posgrado', component: TourPosgradoComponent, data: { titulo: 'Posgrado' } },
  { path: 'graytit', component: TourGradosYTitulosComponent, data: { titulo: 'Grados y ttulos' } },
  { path: 'facultad', component: TourFacultadComponent, data: { titulo: 'Facultades' } }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes)
  ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
