import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { NavigationExtras } from '@angular/router';
import { SearchPage } from '../search/search.page';
import { register } from 'swiper/element';
import { ModalController } from '@ionic/angular';
import { Product, Category } from 'src/app/models/ecommerce.model';
import { environment } from 'src/environments/environment';
import { EcommerceService } from 'src/app/services/ecommerce.service';

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
  categoriesWithProducts: Category[] = [];
  loading: boolean = true;
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
    private modalController: ModalController,
    private ecommerceService: EcommerceService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      this.loading = true;
      await this.loadCategories();
      await this.loadHomeCategories();
    } catch (error) {
      console.error('Error loading data', error);
    } finally {
      this.loading = false;
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

  async loadHomeCategories() {
    try {
      const data = await this.ecommerceService.getHomeCategories();
      this.categoriesWithProducts = data.result.categories;
    } catch (error) {
      console.error('Error fetching home categories with products', error);
    }
  }

  segmentChanged(event: any) {
    // Handle segment change event
  }

  onProductInfo(productId: number) {
    const param: NavigationExtras = {
      queryParams: {
        id: productId
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

  doRefresh(event: any) {
    this.loadData().then(() => {
      event.target.complete();
    });
  }
}
