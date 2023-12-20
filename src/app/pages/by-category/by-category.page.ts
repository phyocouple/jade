/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { SearchPage } from '../search/search.page';
import { FilterPage } from '../filter/filter.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.page.html',
  styleUrls: ['./by-category.page.scss'],
})
export class ByCategoryPage implements OnInit {
  name: any = '';
  constructor(
    public util: UtilService,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {
    this.route.queryParams.subscribe((data: any) => {
      this.name = data.name;
    })
  }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
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
