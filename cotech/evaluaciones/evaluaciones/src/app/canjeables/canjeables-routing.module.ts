import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanjeablesPage } from './canjeables.page';

const routes: Routes = [
  {
    path: '',
    component: CanjeablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanjeablesPageRoutingModule {}
