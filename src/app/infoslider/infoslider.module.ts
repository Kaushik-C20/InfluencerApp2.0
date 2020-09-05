import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfosliderPageRoutingModule } from './infoslider-routing.module';

import { InfosliderPage } from './infoslider.page';
import {MaterialModule} from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    InfosliderPageRoutingModule
  ],
  declarations: [InfosliderPage]
})
export class InfosliderPageModule {}
