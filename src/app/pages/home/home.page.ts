import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { NavigationExtras } from '@angular/router';
import { SearchPage } from '../search/search.page';
import { register } from 'swiper/element';
import { ModalController } from '@ionic/angular';
import { Product, Category } from 'src/app/models/ecommerce.model';
import { environment } from 'src/environments/environment';

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  cateName: string = '';
  apiUrl: string = environment.apiUrl;
  categories: Category[] = [];
  products: Product[] = [];
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1.2,
    spaceBetween: 10,
    centeredSlides: true,
    autoplay: true
  };

  constructor(
    public util: UtilService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      await this.loadCategories();
      await this.loadProducts();
    } catch (error) {
      console.error('Error loading data', error);
    }
  }

  async loadCategories() {
    try {
      await this.util.loadCategories();
      this.categories = this.util.cateList;
      this.cateName = this.categories.length > 0 ? this.categories[0].name : '';
    } catch (error) {
      console.error('Error loading categories', error);
    }
  }

  async loadProducts() {
    const filters = {
      page: 1,
      category: '',
      search: '',
      min_price: 1,
      max_price: '',
      ppg: 20
    };

    try {
      const response = await this.util.ecommerceService.getProductList(filters);
      this.products = response.result.products;
    } catch (error) {
      console.error('Error loading products', error);
    }
  }

  segmentChanged(event: any) {
    // Handle segment change event
  }

  getDiscountedPrice(price: number, discount: number): string {
    const discountedPrice = price - (price * (discount / 100));
    return discountedPrice.toFixed(2);
  }

  onProductInfo(index: number) {
    const param: NavigationExtras = {
      queryParams: {
        id: index
      }
    };
    this.util.navigateToPage('product-info', param);
  }

  onOffers() {
    this.util.navigateToPage('offers');
  }

  onBrands() {
    this.util.navigateToPage('brands');
  }

  byCategory(name: string, id: any) {
    const param: NavigationExtras = {
      queryParams: {
        name: name,
        id: id
      }
    };
    this.util.navigateToPage('by-category', param);
  }

  async onSearch() {
    const modal = await this.modalController.create({
      component: SearchPage,
    });
    await modal.present();
  }

  onChat() {
    this.util.navigateToPage('chats');
  }
}
