/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ActivatedRoute } from '@angular/router';
import { VariationsModalPage } from '../variations-modal/variations-modal.page';
import Swiper from 'swiper';
import { register } from 'swiper/element';
import { ModalController } from '@ionic/angular';

register();
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})
export class ProductInfoPage implements OnInit {
  @ViewChild("swiper") swiper?: ElementRef<{ swiper: Swiper }>
  index: any = 0;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay: true
  };
  title: any = '';
  cover: any = '';
  price: any = 0;
  discount: any = 0;
  discountPercentage: any = 0;
  stock: any = 0;
  brand: any = '';
  selectedColor: any = 'red';
  selectedSize: any = 's';
  images: any[] = [];
  id: any = '';
  constructor(
    public util: UtilService,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      this.id = data.id;
      const info = this.util.products[data.id];
      console.log(info);
      if (info && info.title) {
        this.title = info.title;
        this.cover = info.thumbnail;
        this.price = info.price;
        this.brand = info.brand;
        this.discountPercentage = info.discountPercentage;
        this.discount = this.getDiscountedPrice(info.price, info.discountPercentage);
        this.stock = info.stock;
        this.images = info.images;
        console.log(this.images);
      }
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

  changeColor(name: any) {
    this.selectedColor = name;
  }

  changeSize(name: any) {
    this.selectedSize = name;
  }

  slideChanged(event: any) {
    this.index = this.swiper?.nativeElement.swiper.activeIndex;
  }

  async openVariations() {
    const modal = await this.modalController.create({
      component: VariationsModalPage,
      cssClass: 'variations_modal',
      componentProps: { index: this.id }
    });
    modal.onDidDismiss().then(() => {
      this.util.navigateRoot('tabs/cart');
    });
    await modal.present();
  }

}
