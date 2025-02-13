export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity?: number;
}

export interface Cart {
  product_id: string;
  quantity: number;
}

export interface Discount {
  code: string;
  type: string;
  amount: number;
}

export enum DISCOUNTS {
  FLAT10 = 'FLAT10',
  PCT5 = 'PCT5',
  BOGO = 'BOGO',
}
