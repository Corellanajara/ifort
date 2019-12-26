import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstrumentoPageRoutingModule } from './instrumento-routing.module';

import { InstrumentoPage } from './instrumento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstrumentoPageRoutingModule
  ],
  declarations: [InstrumentoPage]
})
export class InstrumentoPageModule {}
