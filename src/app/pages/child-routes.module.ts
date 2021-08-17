import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DestinoComponent } from './destino/destino.component';
import { DestinoGuiadoComponent } from './destino-guiado/destino-guiado.component';
import { TransporteComponent } from './transporte/transporte.component';
import { PerfilComponent } from './perfil/perfil.component';

const childRoutes:Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Destino' } },
  { path: 'destino', component: DestinoComponent, data: { titulo: 'Destino' } },
  { path: 'destino-guiado', component: DestinoGuiadoComponent, data: { titulo: 'Destino Guiado' } },
  { path: 'transporte', component: TransporteComponent, data: { titulo: 'Transporte' } },

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
