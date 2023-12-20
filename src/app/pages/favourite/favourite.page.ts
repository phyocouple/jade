/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { FilterPage } from '../filter/filter.page';
import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

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

  onProductInfo(index: any) {
    const param: NavigationExtras = {
      queryParams: {
        id: index
      }
    };
    this.util.navigateToPage('product-info', param);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterPage,
    });
    await modal.present();
  }

  async onSearch() {
    const modal = await this.modalController.create({
      component: SearchPage,
    });
    await modal.present();
  }

}
