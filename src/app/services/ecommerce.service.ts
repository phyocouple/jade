import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Product, Category, ApiResponse, ProductListResponse, HomeCategoriesResponse } from '../models/ecommerce.model';
import { OdooAuthService } from './odoo-auth.service';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  public apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private odooAuthService: OdooAuthService) {}

  private calculateDiscountPercentage(basePrice: number, reducedPrice: number): number {
    if (basePrice === 0) return 0;
    return ((basePrice - reducedPrice) / basePrice) * 100;
  }

  private enrichProductData(products: Product[]): Product[] {
    return products.map(product => {
      const discountPercentage = this.calculateDiscountPercentage(product.price.base_price, product.price.price_reduce);
      return {
        ...product,
        discountPercentage
      };
    });
  }

  async getProductList(filters: any): Promise<ProductListResponse> {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: filters,
      id: null
    };

    const options = {
      url: `${this.apiUrl}/api/shop`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
    };

    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      const data: ProductListResponse = response.data;
      if (data.result) {
        // Enrich product data with calculated fields
        data.result.products = this.enrichProductData(data.result.products);
        return data;
      } else {
        throw new Error(data.error ? data.error.message : 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching product list', error);
      throw new Error('Failed to fetch product list');
    }
  }

  async getProductDetail(productId: number): Promise<any> {
    const options = {
      url: `${this.apiUrl}/api/product/${productId}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { id: productId } // JSON body
    };

    const response: HttpResponse = await CapacitorHttp.request(options);
    return response.data;
  }

  async getCombinationInfo(productTemplateId: number, productId: number, combination: any, addQty: number) {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        product_template_id: productTemplateId,
        product_id: productId,
        combination: combination,
        add_qty: addQty,
        pricelist_id: false,
        parent_combination: []
      },
      id: new Date().getTime()
    };
  
    const options = {
      url: `${this.apiUrl}/api/product/combinations`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
    };
  
    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      const data: ApiResponse<any> = response.data;
      if (data.result) {
        return data.result;
      } else {
        throw new Error(data.error ? data.error.message : 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching combination info', error);
      throw new Error('Failed to fetch combination info');
    }
  }
  
  async getPublicCategories(): Promise<Category[]> {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {},
      id: null
    };
  
    const options = {
      url: `${this.apiUrl}/api/categories`,
      headers: { 'Content-Type': 'application/json' },
      data: body,
    };
  
    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      const data: ApiResponse<Category[]> = response.data;
      if (data.result) {
        return data.result;
      } else {
        throw new Error(data.error ? data.error.message : 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching categories', error);
      throw new Error('Failed to fetch categories');
    }
  }

  async getHomeCategories(): Promise<HomeCategoriesResponse> {
    const sessionId = await this.odooAuthService.getSessionId();
    const options = {
      url: `${this.apiUrl}/api/home_categories`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `session_id=${sessionId}`
      },
      data: {
        jsonrpc: "2.0",
        params: {}
      }
    };

    try {
      const response: HttpResponse = await CapacitorHttp.request(options);
      return response.data as HomeCategoriesResponse;
    } catch (error) {
      console.error('Error fetching home categories with products', error);
      throw error;
    }
  }
  
  private async getHttpOptions() {
    const sessionId = await this.odooAuthService.getSessionId();
    return {
      'Content-Type': 'application/json',
    };
  }

  async addToCart(
    productId: number,
    quantity: number,
    variantValues: number[],
    productCustomAttributeValues: any[],
    pricelistId: boolean,
    forceDialog: boolean,
    noAttribute: any[],
    customAttribute: any[],
    context: any
  ): Promise<any> {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        product_id: productId,
        variant_values: variantValues,
        product_custom_attribute_values: productCustomAttributeValues,
        pricelist_id: pricelistId,
        add_qty: quantity,
        force_dialog: forceDialog,
        no_attribute: noAttribute,
        custom_attribute: customAttribute,
        context: context
      },
      id: new Date().getTime()
    };

    const options = {
      url: `${this.apiUrl}/api/cart/update_json`,
      headers: {'Content-Type': 'application/json'},
      data: body,
    };

    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      const data: ApiResponse<any> = response.data;
      if (data.result) {
        return data.result;
      } else {
        throw new Error(data.error ? data.error.message : 'Unknown error');
      }
    } catch (error) {
      console.error('Error adding to cart', error);
      throw new Error('Failed to add to cart');
    }
  }

}
