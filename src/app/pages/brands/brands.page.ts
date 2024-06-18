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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.page.html',
  styleUrls: ['./brands.page.scss'],
})
export class BrandsPage implements OnInit {
  apiUrl: string = environment.apiUrl;
  constructor(
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }

  byCategory(name: string, id: number) {
    const param: NavigationExtras = {
      queryParams: {
        name: name,
        id: id
      }
    };
    this.util.navigateToPage('by-category', param);
  }

}
