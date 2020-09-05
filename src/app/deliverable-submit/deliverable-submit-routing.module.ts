import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverableSubmitPage } from './deliverable-submit.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverableSubmitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverableSubmitPageRoutingModule {}
