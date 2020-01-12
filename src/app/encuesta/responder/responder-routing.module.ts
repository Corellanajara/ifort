import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponderPage } from './responder.page';

const routes: Routes = [
  {
    path: '',
    component: ResponderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponderPageRoutingModule {}
