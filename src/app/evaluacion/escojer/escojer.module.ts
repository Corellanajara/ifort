import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscojerPageRoutingModule } from './escojer-routing.module';

import { EscojerPage } from './escojer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscojerPageRoutingModule
  ],
  declarations: [EscojerPage]
})
export class EscojerPageModule {}
