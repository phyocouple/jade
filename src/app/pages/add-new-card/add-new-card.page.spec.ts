/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Ecommerce - 1 DilMart This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewCardPage } from './add-new-card.page';

describe('AddNewCardPage', () => {
  let component: AddNewCardPage;
  let fixture: ComponentFixture<AddNewCardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddNewCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
