import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesignTestPageRoutingModule } from './design-test-routing.module';

import { DesignTestPage } from './design-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesignTestPageRoutingModule
  ],
  declarations: [DesignTestPage]
})
export class DesignTestPageModule {}
