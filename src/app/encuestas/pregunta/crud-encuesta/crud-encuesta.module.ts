import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudEncuestaPageRoutingModule } from './crud-encuesta-routing.module';

import { CrudEncuestaPage } from './crud-encuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudEncuestaPageRoutingModule
  ],
  declarations: [CrudEncuestaPage]
})
export class CrudEncuestaPageModule {}
