/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  selected: any = 'refined';
  constructor(
    private modalController: ModalController
  ) {
  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

  changeFilter(name: string) {
    this.selected = name;
  }

}
