/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShippingListPage } from './shipping-list.page';

describe('ShippingListPage', () => {
  let component: ShippingListPage;
  let fixture: ComponentFixture<ShippingListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShippingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
