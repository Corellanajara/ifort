import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignarPageRoutingModule } from './asignar-routing.module';

import { AsignarPage } from './asignar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignarPageRoutingModule
  ],
  declarations: [AsignarPage]
})
export class AsignarPageModule {}
