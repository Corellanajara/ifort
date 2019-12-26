import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxTreeDndModule } from 'ngx-tree-dnd';
import { DragPageRoutingModule } from './drag-routing.module';

import { DragPage } from './drag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxTreeDndModule,
    IonicModule,
    DragPageRoutingModule
  ],
  declarations: [DragPage]
})
export class DragPageModule {}
