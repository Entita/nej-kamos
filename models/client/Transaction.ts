import { Basket } from "./Basket";

export interface Transaction {
  _id: string,
  status: string,
  type: string,
  createdAt: Date,
  basket: Basket,
}