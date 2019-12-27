import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportarPagePregunta } from './importar.page';

const routes: Routes = [
  {
    path: '',
    component: ImportarPagePregunta
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportarPageRoutingModule {}
