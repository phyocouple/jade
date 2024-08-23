import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Product, Category, ApiResponse, ProductListResponse, HomeCategoriesResponse } from '../models/ecommerce.model';
import { CartResponse } from '../models/cart.model';
import { OdooAuthService } from './odoo-auth.service';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  public apiUrl: string = environment.apiUrl;

  constructor(private odooAuthService: OdooAuthService) {}

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

  private async getHttpOptions() {
    const sessionId = await this.odooAuthService.getSessionId();
    return {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': sessionId ? `session_id=${sessionId}` : '',
        'Authorization': 'session_id=a36ff8a6818008a9f2805e835ff360367519c5fb'
      },
      withCredentials: true,
    };
  }

  private async handleResponse<T>(response: HttpResponse): Promise<T> {
    // Check for session ID in the response cookies
    const setCookieHeader = response.headers['set-cookie'] || response.headers['Set-Cookie'];
    if (setCookieHeader) {
      const cookies = setCookieHeader.split(';');
      const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session_id='));
      if (sessionCookie) {
        const sessionId = sessionCookie.split('=')[1];
        await this.odooAuthService.setSessionId(sessionId);
      }
    }
    return response.data as T;
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
      method: 'POST',
      ...await this.getHttpOptions(),
      data: body,
    };

    try {
      const response: HttpResponse = await CapacitorHttp.request(options);
      const data = await this.handleResponse<ProductListResponse>(response);
      if (data.result) {
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
      ...await this.getHttpOptions(),
      data: { id: productId }
    };

    const response: HttpResponse = await CapacitorHttp.request(options);
    return this.handleResponse<any>(response);
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
      method: 'POST',
      ...await this.getHttpOptions(),
      data: body,
    };

    try {
      const response: HttpResponse = await CapacitorHttp.request(options);
      const data = await this.handleResponse<ApiResponse<any>>(response);
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
      method: 'POST',
      ...await this.getHttpOptions(),
      data: body,
    };

    try {
      const response: HttpResponse = await CapacitorHttp.request(options);
      const data = await this.handleResponse<ApiResponse<Category[]>>(response);
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

  async getCart(): Promise<CartResponse> {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {},
      id: null
    };

    const options = {
      url: `${this.apiUrl}/api/cart`,
      method: 'POST',
      ...await this.getHttpOptions(),
      data: body,
    };

    try {
      const response: HttpResponse = await CapacitorHttp.request(options);
      return this.handleResponse<CartResponse>(response);
    } catch (error) {
      console.error('Error fetching cart', error);
      throw new Error('Failed to fetch cart');
    }
  }

  async getHomeCategories(): Promise<HomeCategoriesResponse> {
    const options = {
      url: `${this.apiUrl}/api/home_categories`,
      method: 'POST',
      ...await this.getHttpOptions(),
      data: {
        jsonrpc: "2.0",
        params: {}
      }
    };

    try {
      const response: HttpResponse = await CapacitorHttp.request(options);
      return this.handleResponse<HomeCategoriesResponse>(response);
    } catch (error) {
      console.error('Error fetching home categories with products', error);
      throw error;
    }
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
      method: 'POST',
      ...await this.getHttpOptions(),
      data: body,
    };

    try {
      const response: HttpResponse = await CapacitorHttp.request(options);
      const data = await this.handleResponse<ApiResponse<any>>(response);
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
