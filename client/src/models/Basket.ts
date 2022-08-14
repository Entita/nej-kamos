import { Product } from "./Product";

export interface Basket {
  _id: string,
  products: Array<Product>,
  coupon: string,
  discount: {
    amount: number,
    percent: number,
  },
}