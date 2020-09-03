import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportarPageRoutingModule } from './importar-routing.module';

import { ImportarPage } from './importar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportarPageRoutingModule
  ],
  declarations: [ImportarPage]
})
export class ImportarPageModule {}
