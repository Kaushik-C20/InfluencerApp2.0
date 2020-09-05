import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignEligibilityPageRoutingModule } from './campaign-eligibility-routing.module';

import { CampaignEligibilityPage } from './campaign-eligibility.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignEligibilityPageRoutingModule
  ],
  declarations: [CampaignEligibilityPage]
})
export class CampaignEligibilityPageModule {}
