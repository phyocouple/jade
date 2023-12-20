/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { NavigationExtras } from '@angular/router';
import { SearchPage } from '../search/search.page';
import { register } from 'swiper/element';
import { ModalController } from '@ionic/angular';

register();
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  cateName: any = '';
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1.2,
    spaceBetween: 10,
    centeredSlides: true,
    autoplay: true
  };
  constructor(
    public util: UtilService,
    private modalController: ModalController
  ) {
    this.cateName = this.util.cateList[0].name;
  }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    // console.log(event);
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

  onOffers() {
    this.util.navigateToPage('offers');
  }

  onBrands() {
    this.util.navigateToPage('brands');
  }

  byCategory(name: string) {
    const param: NavigationExtras = {
      queryParams: {
        name: name
      }
    };
    this.util.navigateToPage('by-category', param);
  }

  async onSearch() {
    const modal = await this.modalController.create({
      component: SearchPage,
    });
    await modal.present();
  }

  onChat() {
    this.util.navigateToPage('chats');
  }

}
