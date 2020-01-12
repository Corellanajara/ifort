import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponderPageRoutingModule } from './responder-routing.module';

import { ResponderPage } from './responder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponderPageRoutingModule
  ],
  declarations: [ResponderPage]
})
export class ResponderPageModule {}
