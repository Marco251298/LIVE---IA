import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { PagesRoutingModule } from './pages/pages.routing';

//Modulos
import { AuthRoutingModule } from './auth/auth.routing';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard/inicio', pathMatch: 'full' },
  {
    path: '**',
    component: NopagefoundComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
