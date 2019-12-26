import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanjeablesPageRoutingModule } from './canjeables-routing.module';

import { CanjeablesPage } from './canjeables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanjeablesPageRoutingModule
  ],
  declarations: [CanjeablesPage]
})
export class CanjeablesPageModule {}
