import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignDescriptionPage } from './campaign-description.page';

const routes: Routes = [
  {
    path: '',
    component: CampaignDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignDescriptionPageRoutingModule {}
