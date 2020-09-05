import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateGigPage } from './create-gig.page';

const routes: Routes = [
  {
    path: '',
    component: CreateGigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateGigPageRoutingModule {}
