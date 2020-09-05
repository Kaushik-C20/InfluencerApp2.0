import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateDetailsPage } from './update-details.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateDetailsPageRoutingModule {}
