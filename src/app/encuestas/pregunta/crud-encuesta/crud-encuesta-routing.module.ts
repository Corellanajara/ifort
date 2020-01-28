import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudEncuestaPage } from './crud-encuesta.page';

const routes: Routes = [
  {
    path: '',
    component: CrudEncuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudEncuestaPageRoutingModule {}
