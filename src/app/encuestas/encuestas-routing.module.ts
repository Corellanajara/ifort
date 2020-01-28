import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncuestasPage } from './encuestas.page';

const routes: Routes = [
  {
    path: '',
    component: EncuestasPage
  },
  {
    path: 'pregunta',
    loadChildren: () => import('./pregunta/pregunta.module').then( m => m.PreguntaPageModule)
  },
  {
    path: 'importar',
    loadChildren: () => import('./importar/importar.module').then( m => m.ImportarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncuestasPageRoutingModule {}
