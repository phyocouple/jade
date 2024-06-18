import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Product, Category, ApiResponse, ProductListResponse } from '../models/ecommerce.model';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  public apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

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
      url: `${this.apiUrl}api/shop`,
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

  // Add more e-commerce-related methods as needed
}
