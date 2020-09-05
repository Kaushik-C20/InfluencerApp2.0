import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoreCampaignDetailsPageRoutingModule } from './my-store-campaign-details-routing.module';

import { MyStoreCampaignDetailsPage } from './my-store-campaign-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoreCampaignDetailsPageRoutingModule
  ],
  declarations: [MyStoreCampaignDetailsPage]
})
export class MyStoreCampaignDetailsPageModule {}
