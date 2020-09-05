import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankdetailsPageRoutingModule } from './bankdetails-routing.module';

import { BankdetailsPage } from './bankdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankdetailsPageRoutingModule
  ],
  declarations: [BankdetailsPage]
})
export class BankdetailsPageModule {}
