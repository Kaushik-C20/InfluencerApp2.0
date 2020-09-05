import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoreCampaignDetailsPage } from './my-store-campaign-details.page';

const routes: Routes = [
  {
    path: '',
    component: MyStoreCampaignDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoreCampaignDetailsPageRoutingModule {}
