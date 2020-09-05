import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignEligibilityPage } from './campaign-eligibility.page';

const routes: Routes = [
  {
    path: '',
    component: CampaignEligibilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignEligibilityPageRoutingModule {}
