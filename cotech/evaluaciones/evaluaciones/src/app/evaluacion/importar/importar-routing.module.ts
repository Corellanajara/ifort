import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportarPage } from './importar.page';

const routes: Routes = [
  {
    path: '',
    component: ImportarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportarPageRoutingModule {}
