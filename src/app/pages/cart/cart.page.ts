import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { VariationsModalPage } from '../variations-modal/variations-modal.page';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { CartOrderLine, CartResponse } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: CartResponse | null = null;
  cartItems: CartOrderLine[] = [];

  constructor(
    public util: UtilService,
    private modalController: ModalController,
    private ecommerceService: EcommerceService
  ) { }

  ngOnInit() {
    this.loadCart();
  }

  async loadCart() {
    try {
      const cartData: CartResponse = await this.ecommerceService.getCart();
      this.cart = cartData;
      if (this.cart && this.cart.values) {
        this.cartItems = this.cart.values.order_lines;
      }
    } catch (error) {
      console.error('Error loading cart', error);
    }
  }

  async doRefresh(event: any) {
    try {
      await this.loadCart();
    } catch (error) {
      console.error('Error refreshing cart', error);
    } finally {
      event.target.complete();
    }
  }

  getDiscountedPrice(price: any, discount: any) {
    var numVal1 = Number(price);
    var numVal2 = Number(discount) / 100;
    var totalValue = numVal1 - (numVal1 * numVal2)
    return totalValue.toFixed(2);
  }

  async openVariations(index: any) {
    const modal = await this.modalController.create({
      component: VariationsModalPage,
      cssClass: 'variations_modal',
      componentProps: { index: index }
    });
    await modal.present();
  }

  onCheckout() {
    this.util.navigateToPage('checkout');
  }

  startShopping() {
    this.util.navigateToPage('home');
  }
}
