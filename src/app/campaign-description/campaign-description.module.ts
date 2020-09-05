import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignDescriptionPageRoutingModule } from './campaign-description-routing.module';

import { CampaignDescriptionPage } from './campaign-description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignDescriptionPageRoutingModule
  ],
  declarations: [CampaignDescriptionPage]
})
export class CampaignDescriptionPageModule {}
