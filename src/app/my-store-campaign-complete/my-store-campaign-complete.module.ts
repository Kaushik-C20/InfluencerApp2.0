import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoreCampaignCompletePageRoutingModule } from './my-store-campaign-complete-routing.module';

import { MyStoreCampaignCompletePage } from './my-store-campaign-complete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoreCampaignCompletePageRoutingModule
  ],
  declarations: [MyStoreCampaignCompletePage]
})
export class MyStoreCampaignCompletePageModule {}
