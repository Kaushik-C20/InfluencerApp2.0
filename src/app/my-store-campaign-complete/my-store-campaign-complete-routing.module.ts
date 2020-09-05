import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoreCampaignCompletePage } from './my-store-campaign-complete.page';

const routes: Routes = [
  {
    path: '',
    component: MyStoreCampaignCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoreCampaignCompletePageRoutingModule {}
