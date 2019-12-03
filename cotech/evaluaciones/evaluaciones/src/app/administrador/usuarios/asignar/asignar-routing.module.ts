import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignarPage } from './asignar.page';

const routes: Routes = [
  {
    path: '',
    component: AsignarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignarPageRoutingModule {}
