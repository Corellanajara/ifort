import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerPageRoutingModule } from './ver-routing.module';

import { VerPage } from './ver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerPageRoutingModule
  ],
  declarations: [VerPage]
})
export class VerPageModule {}
