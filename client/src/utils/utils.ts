import { Basket } from '../models/Basket';
import { Product } from '../models/Product';

function getCookie(key: string) {
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

const Cookie = {
  accountId: () => getCookie('accountId'),
  basketId: () => getCookie('basketId'),
};

export const roundNumber = (num: number, scale: number) => {
  return +(Math.round((num + "e+" + scale) as any)  + "e-" + scale);
}

export const getDiscount = (price: number, discount: { amount: number, percent: number }) => {
  const calc = price - discount.amount - price * (discount.percent / 100);
  return roundNumber(calc, 2);
}

export const totalQuantity = (basket: Basket) => {
  return basket.products.reduce((subcount: number, product: Product) => {
    return subcount + product.quantity;
  }, 0);
};

export const totalBasketPrice = (basket: Basket) => {
  return basket.products
    .reduce((subcount: number, product: Product) => {
      return subcount + totalPrice(product.price, product.discount, product.quantity);
    }, 0)
    .toFixed(2);
};

export const totalBasketPriceWithCoupon = (basket: Basket) => {
  return (getDiscount(Number(totalBasketPrice(basket)), basket.discount || { amount: 0, percent: 0 })).toFixed(2);
};

export const totalPrice = (
  price: number,
  discount: { percent: number; amount: number },
  quantity:number = 1,
) => {
  return getDiscount(price, discount) * quantity;
};

export const formatTotalPrice = (
  price: number,
  discount: { percent: number; amount: number },
  quantity:number = 1,
) => {
  return totalPrice(price, discount, quantity).toFixed(2);
};

export const getServerUrl = () => {
  return process.env.SERVER_URL;
};

export default Cookie;
