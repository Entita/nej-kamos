import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Product } from '../../models/Product';
import { filterProducts } from '../../redux/products';
import ProductItem from './ProductItem';
import { WrapperStyled } from './Products.style';

const addQuantityToProducts = (basketProducts: any, products: Array<Product>) => {
  const productsWithQuantity: Array<Product> = [];
  products.forEach(product => {
    const basketProduct = basketProducts.filter((basketProduct: Product) => basketProduct._id === product._id)[0];
    const basketQuantity = basketProduct ? basketProduct.quantity : 0;
    productsWithQuantity.push({...product, quantity: basketQuantity })
  })

  return productsWithQuantity;
}

export default function Products() {
  const basket = useSelector((state: any) => state.basket.basket);
  const products = useSelector((state: any) => state.products.products);
  const query = new URLSearchParams(useLocation().search);
  const filteredProducts = filterProducts(products, query);
  const filteredProductsWithQuantity = addQuantityToProducts(basket.products, filteredProducts);

  return (
    <WrapperStyled>
      {filteredProductsWithQuantity.map((product: Product, index: any) => (
        <ProductItem product={product} key={index} />
      ))}
    </WrapperStyled>
  );
}
