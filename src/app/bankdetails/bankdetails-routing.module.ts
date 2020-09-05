import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankdetailsPage } from './bankdetails.page';

const routes: Routes = [
  {
    path: '',
    component: BankdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankdetailsPageRoutingModule {}
