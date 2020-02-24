import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluacionPage } from './evaluacion.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluacionPage
  },
  {
    path: 'escojer',
    loadChildren: () => import('./escojer/escojer.module').then( m => m.EscojerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluacionPageRoutingModule {}
