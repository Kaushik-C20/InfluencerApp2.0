import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { NgOtpInputModule } from  'ng-otp-input';

@NgModule({
  declarations: [],
  imports: [
    
    CommonModule
  ],
  exports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule, MatFormFieldModule, MatInputModule, MatToolbarModule,
  ]
})
export class MaterialModule { }