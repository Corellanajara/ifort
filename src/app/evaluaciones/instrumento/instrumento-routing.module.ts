import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstrumentoPage } from './instrumento.page';

const routes: Routes = [
  {
    path: '',
    component: InstrumentoPage
  },
  {
    path: 'respuesta',
    loadChildren: () => import('./respuesta/respuesta.module').then( m => m.RespuestaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrumentoPageRoutingModule {}
