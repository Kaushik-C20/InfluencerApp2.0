import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestAGigPageRoutingModule } from './request-agig-routing.module';

import { RequestAGigPage } from './request-agig.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // BrowserModule,
    RequestAGigPageRoutingModule,
  ],
  declarations: [RequestAGigPage],
})
export class RequestAGigPageModule {}
