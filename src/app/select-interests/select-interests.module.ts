import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectInterestsPageRoutingModule } from './select-interests-routing.module';

import { SelectInterestsPage } from './select-interests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectInterestsPageRoutingModule
  ],
  declarations: [SelectInterestsPage]
})
export class SelectInterestsPageModule {}
