import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntaEncuestaPage } from './pregunta.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntaEncuestaPage
  },
  {
    path: 'crud-encuesta',
    loadChildren: () => import('./crud-encuesta/crud-encuesta.module').then( m => m.CrudEncuestaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntaPageRoutingModule {}
