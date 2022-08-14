export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  brand: string;
  description: string;
  quantity: number;
  discount: {
    percent: number;
    amount: number;
  };
  category: string;
  subcategory: string;
}
