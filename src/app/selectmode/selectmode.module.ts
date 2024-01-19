import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectmodePageRoutingModule } from './selectmode-routing.module';

import { SelectmodePage } from './selectmode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectmodePageRoutingModule
  ],
  declarations: [SelectmodePage]
})
export class SelectmodePageModule {}
