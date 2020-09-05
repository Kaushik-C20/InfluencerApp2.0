import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStorePageRoutingModule } from './my-store-routing.module';

import { MyStorePage } from './my-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStorePageRoutingModule
  ],
  declarations: [MyStorePage]
})
export class MyStorePageModule {}
