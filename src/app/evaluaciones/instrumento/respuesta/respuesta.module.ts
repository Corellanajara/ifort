import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespuestaPageRoutingModule } from './respuesta-routing.module';

import { RespuestaPage } from './respuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespuestaPageRoutingModule
  ],
  declarations: [RespuestaPage]
})
export class RespuestaPageModule {}
