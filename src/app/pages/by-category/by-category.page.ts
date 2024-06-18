import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { SearchPage } from '../search/search.page';
import { FilterPage } from '../filter/filter.page';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/models/ecommerce.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.page.html',
  styleUrls: ['./by-category.page.scss'],
})
export class ByCategoryPage implements OnInit {
  name: string = '';
  id: string = '';
  products: Product[] = [];
  page: number = 1;
  ppg: number = 20;
  totalPages: number = 0;
  apiUrl: string = environment.apiUrl;

  constructor(
    public util: UtilService,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {
    this.route.queryParams.subscribe((data: any) => {
      if (this.name !== data.name) {
        this.name = data.name;
        this.id = data.id;
        this.resetState();
        this.loadProductsByCategory();
      }
    });
  }

  ngOnInit() {
    this.loadProductsByCategory();
  }

  onBack() {
    this.util.onBack();
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterPage,
    });
    await modal.present();
  }

  async onSearch() {
    const modal = await this.modalController.create({
      component: SearchPage,
    });
    await modal.present();
  }

  private async loadProductsByCategory() {
    try {
      const filters = {
        page: this.page,
        category: this.id,
        search: '',
        min_price: 0,
        max_price: 10000,
        ppg: this.ppg
      };

      const response = await this.util.ecommerceService.getProductList(filters);
      this.products = response.result.products;
      this.totalPages = response.result.pager.pages;
    } catch (error) {
      console.error('Error loading products by category', error);
    }
  }

  async loadMoreProducts(event: any) {
    this.page++;
    if (this.page > this.totalPages) {
      event.target.disabled = true;
      return;
    }

    try {
      const filters = {
        page: this.page,
        category: this.id,
        search: '',
        min_price: 0,
        max_price: 10000,
        ppg: this.ppg
      };

      const response = await this.util.ecommerceService.getProductList(filters);
      this.products = [...this.products, ...response.result.products];
      event.target.complete();

      // Disable infinite scroll if we've loaded all products
      if (this.page >= this.totalPages) {
        event.target.disabled = true;
      }
    } catch (error) {
      console.error('Error loading more products', error);
      event.target.complete(); // Complete the event even if there's an error to avoid endless loading
    }
  }

  private resetState() {
    this.products = [];
    this.page = 1;
    this.totalPages = 0;
  }
}
