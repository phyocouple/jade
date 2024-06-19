import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ActivatedRoute } from '@angular/router';
import { VariationsModalPage } from '../variations-modal/variations-modal.page';
import Swiper from 'swiper';
import { register } from 'swiper/element';
import { ModalController } from '@ionic/angular';
import { ApiResponse, Product } from 'src/app/models/ecommerce.model';

register();

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})
export class ProductInfoPage implements OnInit {
  @ViewChild("swiper") swiper?: ElementRef<{ swiper: Swiper }>;
  index: any = 0;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay: true
  };
  title: any = '';
  cover: any = '';
  price: any = 0;
  discount: any = 0;
  discountPercentage: any = 0;
  stock: any = 0;
  brand: any = '';
  selectedColor: any = 'red';
  selectedSize: any = 's';
  images: any[] = [];
  id: any = '';
  product: Product | null = null;
  selectedAttributes: { [key: number]: number } = {};  // Map attribute_id to value_id
  isCombinationValid: boolean = true;

  constructor(
    public util: UtilService,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {
    this.route.queryParams.subscribe((data: any) => {
      this.id = data.id;
      this.loadProductInfo(this.id);
    });
  }

  ngOnInit() {}

  async loadProductInfo(productId: number) {
    try {
      const response: ApiResponse<Product> = await this.util.ecommerceService.getProductDetail(productId);
      this.product = response.result;

      if (this.product) {
        this.title = this.product.name;
        this.cover = this.util.getApiUrl() + this.product.image_url;
        
        // Add cover image to the beginning of images array
        this.images = [this.cover, ...this.product.photos.map(photo => this.util.getApiUrl() + photo.url)];
        
        // Initialize selectedAttributes with the first value of each attribute
        for (const attribute of this.product.attributes) {
          if (attribute.values.length > 0) {
            this.selectedAttributes[attribute.id] = attribute.values[0].id;
          }
        }

        // Fetch combination info for the default combination
        this.fetchCombinationInfo(this.getCombinationAttributes());
      }
    } catch (error) {
      console.error('Error loading product info', error);
    }
  }

  onBack() {
    this.util.onBack();
  }

  getDiscountedPrice(price: any, discount: any) {
    const numVal1 = Number(price);
    const numVal2 = Number(discount) / 100;
    const totalValue = numVal1 - (numVal1 * numVal2);
    return totalValue.toFixed(2);
  }

  changeColor(name: any) {
    this.selectedColor = name;
  }

  changeSize(name: any) {
    this.selectedSize = name;
  }

  slideChanged(event: any) {
    this.index = this.swiper?.nativeElement.swiper.activeIndex;
  }

  async openVariations() {
    const modal = await this.modalController.create({
      component: VariationsModalPage,
      cssClass: 'variations_modal',
      componentProps: { index: this.id }
    });
    modal.onDidDismiss().then(() => {
      this.util.navigateRoot('tabs/cart');
    });
    await modal.present();
  }

  selectAttribute(attributeId: number, valueId: number) {
    this.selectedAttributes[attributeId] = valueId;
    this.fetchCombinationInfo(this.getCombinationAttributes());
  }

  getCombinationAttributes(): number[] {
    return Object.values(this.selectedAttributes);
  }

  async fetchCombinationInfo(combination: number[]) {
    try {
      if (this.product) {
        if (this.product.attributes.length === 1) {
          this.isCombinationValid = true;
          const validCombination = this.product.combinations[0]
          if (validCombination) {
            this.updateProductInfo(validCombination);
          }
        } else {
          const validCombination = this.product.combinations.find(combo => {
            return combination.every(attrId => Object.values(combo.attributes).some(attr => attr.id === attrId));
          });

          if (validCombination) {
            this.isCombinationValid = true;
            this.updateProductInfo(validCombination);
          } else {
            this.isCombinationValid = false;
          }
        }
      }
    } catch (error) {
      console.error('Error fetching combination info', error);
      this.isCombinationValid = false;
    }
  }

  async updateProductInfo(combination: any) {
    try {
      const combinationResponse = await this.util.ecommerceService.getCombinationInfo(this.product!.template_id, combination.id, this.getCombinationAttributes(), 1);
      if (combinationResponse) {
        this.product!.price = {
          base_price: combinationResponse.price,
          price_reduce: combinationResponse.price_extra,
          discount_percentage: combinationResponse.has_discounted_price ? ((combinationResponse.list_price - combinationResponse.price) / combinationResponse.list_price) * 100 : 0
        };
        this.price= combinationResponse.price
        this.cover = this.util.getApiUrl() + combinationResponse.image_url;
        this.images = [this.cover, ...this.product!.photos.map(photo => this.util.getApiUrl() + photo.url)];
      }
    } catch (error) {
      console.error('Error updating product info with combination', error);
    }
  }
}
