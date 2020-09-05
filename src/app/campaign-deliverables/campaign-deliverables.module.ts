import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignDeliverablesPageRoutingModule } from './campaign-deliverables-routing.module';

import { CampaignDeliverablesPage } from './campaign-deliverables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignDeliverablesPageRoutingModule
  ],
  declarations: [CampaignDeliverablesPage]
})
export class CampaignDeliverablesPageModule {}
