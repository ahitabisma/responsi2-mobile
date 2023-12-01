import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PribadiPageRoutingModule } from './pribadi-routing.module';

import { PribadiPage } from './pribadi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PribadiPageRoutingModule
  ],
  declarations: [PribadiPage]
})
export class PribadiPageModule {}
