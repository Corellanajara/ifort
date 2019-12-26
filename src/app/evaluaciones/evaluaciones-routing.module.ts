import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluacionesPage } from './evaluaciones.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluacionesPage
  },
  {
    path: 'instrumento',
    loadChildren: () => import('./instrumento/instrumento.module').then( m => m.InstrumentoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluacionesPageRoutingModule {}
