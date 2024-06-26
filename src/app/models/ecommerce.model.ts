export interface Product {
  id: number;
  template_id: number;
  name: string;
  description: string;
  rating: number;
  price: Price;
  currency: string;
  image_url: string;
  image_path: string;
  brand: string;
  stock: number;
  categories: string[];
  attributes: Attribute[];
  photos: Photo[];
  combinations: Combination[];
  discountPercentage?: number;
}

export interface Combination {
  id: number;
  attributes: {
    [key: string]: {
      id: number;
      name: string;
    };
  };
  image_url: string;
  price: number;
}

export interface Price {
  price_reduce: number;
  base_price: number;
  discount_percentage?: number;  // Added this for discount percentage if it exists
}

export interface Attribute {
  id: number;
  name: string;
  values: AttributeValue[];
}

export interface AttributeValue {
  id: number;
  name: string;
  additional_price: number;  // The additional price for the attribute value
}

export interface Photo {
  id: number;
  name: string;
  url: string;
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
  sequence: number;
  parent_id?:any
}

export interface ApiResponse<T> {
  jsonrpc: string;
  id: number | null;
  result: T;
  error?: any;
}

