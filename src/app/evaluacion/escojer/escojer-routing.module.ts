import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscojerPage } from './escojer.page';

const routes: Routes = [
  {
    path: '',
    component: EscojerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscojerPageRoutingModule {}
