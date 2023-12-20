/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  onOrders() {
    this.util.navigateToPage('/orders');
  }

  onEditProfile() {
    this.util.navigateToPage('/edit-profile');
  }

  onCoupon() {
    this.util.navigateToPage('/offers');
  }

  onGiftCards() {
    this.util.navigateToPage('/gift-cards');
  }

  onReviewList() {
    this.util.navigateToPage('/review-list');
  }

  onFavourite() {
    this.util.navigateToPage('tabs/favourite');
  }

  onHelp() {
    this.util.navigateToPage('/help');
  }

}
