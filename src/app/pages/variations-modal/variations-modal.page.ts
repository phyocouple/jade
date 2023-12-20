/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-variations-modal',
  templateUrl: './variations-modal.page.html',
  styleUrls: ['./variations-modal.page.scss'],
})
export class VariationsModalPage implements OnInit {
  title: any = '';
  cover: any = '';
  price: any = 0;
  discount: any = 0;
  discountPercentage: any = 0;
  stock: any = 0;

  selectedColor: any = 'red';
  selectedSize: any = 's';
  constructor(
    private modalController: ModalController,
    private navParam: NavParams,
    public util: UtilService
  ) {
    console.log(this.navParam.get('index'));
    const info = this.util.products[this.navParam.get('index')];
    console.log(info);
    if (info && info.title) {
      this.title = info.title;
      this.cover = info.thumbnail;
      this.price = info.price;
      this.discountPercentage = info.discountPercentage;
      this.discount = this.getDiscountedPrice(info.price, info.discountPercentage);
      this.stock = info.stock;
    }
  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

  getDiscountedPrice(price: any, discount: any) {
    var numVal1 = Number(price);
    var numVal2 = Number(discount) / 100;
    var totalValue = numVal1 - (numVal1 * numVal2)
    return totalValue.toFixed(2);
  }

  changeColor(name: any) {
    this.selectedColor = name;
  }

  changeSize(name: any) {
    this.selectedSize = name;
  }

}
