/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { register } from 'swiper/element';

register();
@Component({
  selector: 'app-payment-cards',
  templateUrl: './payment-cards.page.html',
  styleUrls: ['./payment-cards.page.scss'],
})
export class PaymentCardsPage implements OnInit {
  dynamicColors: any[] = [
    '#F8A63B',
    '#9C33CE',
    '#3C3DA9',
    '#F53D6E',
    '#4DB1E5'
  ];

  cardsList: any[] = [
    {
      "name": "Herman C. Wallace",
      "number": "307-72-XXXX-307-72-XXXX",
      "exp": "11/33",
      "color": this.getBackgroundColor()
    },
    {
      "name": "Carolyn B. Lewis",
      "number": "621-96-XXXX-621-96-XXXX",
      "exp": "11/33",
      "color": this.getBackgroundColor()
    },
    {
      "name": "Maureen G. McEwen",
      "number": "548-24-XXXX-548-24-XXXX",
      "exp": "11/33",
      "color": this.getBackgroundColor()
    },
    {
      "name": "Herman C. Wallace",
      "number": "307-72-XXXX-307-72-XXXX",
      "exp": "11/33",
      "color": this.getBackgroundColor()
    },
    {
      "name": "Carolyn B. Lewis",
      "number": "621-96-XXXX-621-96-XXXX",
      "exp": "11/33",
      "color": this.getBackgroundColor()
    },
    {
      "name": "Maureen G. McEwen",
      "number": "548-24-XXXX-548-24-XXXX",
      "exp": "11/33",
      "color": this.getBackgroundColor()
    },
  ];

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1.2,
    spaceBetween: 10,
    centeredSlides: true
  };
  constructor(
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }

  getBackgroundColor() {
    var num = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    console.log(num);
    return this.dynamicColors[num];
  }

  addNewCard() {
    this.util.navigateToPage('add-new-card');
  }

}
