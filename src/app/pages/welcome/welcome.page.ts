/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import Swiper from 'swiper';
import { register } from 'swiper/element';

register();
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild("swiper") swiper?: ElementRef<{ swiper: Swiper }>
  index: any = 0;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay: true
  };
  isEnd: boolean = false;
  constructor(
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  slideChanged(event: any) {
    this.index = this.swiper?.nativeElement.swiper.activeIndex;
    this.isEnd = this.swiper?.nativeElement.swiper.isEnd ?? false;
  }

  nextSlide() {
    this.swiper?.nativeElement.swiper.slideNext();
  }

  onLogin() {
    this.util.navigateRoot('login');
  }
}
