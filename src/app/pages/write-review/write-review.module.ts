/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WriteReviewPageRoutingModule } from './write-review-routing.module';

import { WriteReviewPage } from './write-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WriteReviewPageRoutingModule
  ],
  declarations: [WriteReviewPage]
})
export class WriteReviewPageModule { }
