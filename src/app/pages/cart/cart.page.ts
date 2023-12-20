/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { VariationsModalPage } from '../variations-modal/variations-modal.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(
    public util: UtilService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  getDiscountedPrice(price: any, discount: any) {
    var numVal1 = Number(price);
    var numVal2 = Number(discount) / 100;
    var totalValue = numVal1 - (numVal1 * numVal2)
    return totalValue.toFixed(2);
  }

  async openVariations(index: any) {
    const modal = await this.modalController.create({
      component: VariationsModalPage,
      cssClass: 'variations_modal',
      componentProps: { index: index }
    });
    await modal.present();
  }

  onCheckout() {
    this.util.navigateToPage('checkout');
  }

}
