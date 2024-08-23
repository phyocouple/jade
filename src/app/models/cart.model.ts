export interface CartOrderLine {
    id: number;
    product_id: number;
    product_template_id: number;
    product_name: string;
    product_description: string;
    product_qty: number;
    price_unit: number;
    price_subtotal: number;
    price_total: number;
    currency: string;
    combination: any[];
    image_url: string;
  }
  
  export interface CartResponse {
    status: string;
    values: {
      website_sale_order: {
        id: number;
        name: string;
        amount_total: number;
        cart_quantity: number;
      };
      order_lines: CartOrderLine[];
      date: string;
      suggested_products: any[];
      promo_code_success: boolean;
      promo_code_error: any;
      providers_sudo: string;
      fees_by_provider: any;
      amount: number;
      minor_amount: number;
      merchant_name: string;
      currency: string;
      partner_id: number;
      payment_access_token: string;
      transaction_route: string;
      express_checkout_route: string;
      landing_route: string;
    };
  }
  