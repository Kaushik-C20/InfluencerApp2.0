import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectInterestsPage } from './select-interests.page';

const routes: Routes = [
  {
    path: '',
    component: SelectInterestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectInterestsPageRoutingModule {}
