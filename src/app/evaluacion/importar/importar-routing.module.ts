import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportarPageEvaluacion } from './importar.page';

const routes: Routes = [
  {
    path: '',
    component: ImportarPageEvaluacion
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportarPageRoutingModule {}
