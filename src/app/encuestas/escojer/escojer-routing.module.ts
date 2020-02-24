import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscojerEncuestasPage } from './escojer.page';

const routes: Routes = [
  {
    path: '',
    component: EscojerEncuestasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscojerPageRoutingModule {}
