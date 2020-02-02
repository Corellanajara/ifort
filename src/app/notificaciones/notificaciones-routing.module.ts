import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionesPage } from './notificaciones.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionesPage
  },
  {
    path: 'ver',
    loadChildren: () => import('./ver/ver.module').then( m => m.VerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionesPageRoutingModule {}
