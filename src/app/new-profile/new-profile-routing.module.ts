import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewProfilePage } from './new-profile.page';

const routes: Routes = [
  {
    path: '',
    component: NewProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewProfilePageRoutingModule {}
