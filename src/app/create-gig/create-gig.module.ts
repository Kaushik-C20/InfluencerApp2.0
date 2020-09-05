import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateGigPageRoutingModule } from './create-gig-routing.module';

import { CreateGigPage } from './create-gig.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateGigPageRoutingModule
  ],
  declarations: [CreateGigPage]
})
export class CreateGigPageModule {}
