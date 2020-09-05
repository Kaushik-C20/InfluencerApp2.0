import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestAGigPage } from './request-agig.page';

const routes: Routes = [
  {
    path: '',
    component: RequestAGigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestAGigPageRoutingModule {}
