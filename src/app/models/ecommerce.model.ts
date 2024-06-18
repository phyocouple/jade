export interface Product {
    id: number;
    name: string;
    description: string;
    rating:number;
    price: Price;
    currency: string;
    image_url: string;
    image_path: string;
    brand: string;
    stock: number;
    categories: string[];
    discountPercentage?: number;
  }
  
  export interface Price {
    price_reduce: number;
    base_price: number;
  }
  
  export interface Pager {
    pages: number;
    current_page: number;
    total_products: number;
    products_per_page: number;
  }
  
  export interface ProductListResult {
    products: Product[];
    pager: Pager;
  }
  
  export interface ProductListResponse {
    jsonrpc: string;
    id: number | null;
    result: ProductListResult;
    error?: any;  // Error is optional and may not be present
  }
  
  export interface Category {
    id: number;
    name: string;
    image_url: string;
  }
  
  export interface ApiResponse<T> {
    jsonrpc: string;
    id: number | null;
    result: T;
    error?: any;
  }
  