/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CouponListPage } from './coupon-list.page';

describe('CouponListPage', () => {
  let component: CouponListPage;
  let fixture: ComponentFixture<CouponListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CouponListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
