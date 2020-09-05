import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewProfilePageRoutingModule } from './new-profile-routing.module';

import { NewProfilePage } from './new-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewProfilePageRoutingModule
  ],
  declarations: [NewProfilePage]
})
export class NewProfilePageModule {}
