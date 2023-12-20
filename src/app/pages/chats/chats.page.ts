/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { register } from 'swiper/element';

register();
@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  chatDisplay: boolean = false;
  chatLoader: boolean = false;
  slideOptStores = {
    initialSlide: 0,
    slidesPerView: 5.2,
  };
  constructor(
    public util: UtilService
  ) {
    this.chatLoader = true;
    setTimeout(() => {
      this.chatLoader = false;
      this.chatDisplay = true;
    }, 1000);
  }

  ngOnInit() {
  }

  onChat(index: any) {
    console.log(index);
    const param: NavigationExtras = {
      queryParams: {
        id: index
      }
    };
    this.util.navigateToPage('inbox', param);
  }

  onBack() {
    this.util.onBack();
  }

}
