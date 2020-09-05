import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverableSubmitPageRoutingModule } from './deliverable-submit-routing.module';

import { DeliverableSubmitPage } from './deliverable-submit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverableSubmitPageRoutingModule
  ],
  declarations: [DeliverableSubmitPage]
})
export class DeliverableSubmitPageModule {}
