import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignDetailsPageRoutingModule } from './campaign-details-routing.module';

import { CampaignDetailsPage } from './campaign-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignDetailsPageRoutingModule
  ],
  declarations: [CampaignDetailsPage]
})
export class CampaignDetailsPageModule {}
