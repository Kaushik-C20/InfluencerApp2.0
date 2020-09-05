import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfosliderPage } from './infoslider.page';

const routes: Routes = [
  {
    path: '',
    component: InfosliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfosliderPageRoutingModule {}
