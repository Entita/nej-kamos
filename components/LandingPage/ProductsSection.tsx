import React from 'react';
import { useSelector } from 'react-redux';
import { Product } from '../../models/client/Product';
import { selectAccount } from '../../redux/account';
import { selectBasket } from '../../redux/basket';
import { selectProducts } from '../../redux/products';
import { addQuantityToProducts, totalPrice } from '../../utils/utils';
import Notification from '../Notification/Notification';
import ProductItem from './ProductItem';
import {
  ProductsWrapperStyled,
  SectionHeaderStyled,
  SectionOrderOptionStyled,
  SectionOrderSelectStyled,
  SectionOrderTitleStyled,
  SectionOrderWrapperStyled,
  SectionTitleStyled,
  WrapperStyled,
} from './ProductsSection.style';

const orderProductsFromCheapest = (products: Array<Product>) => {
  const clonedProducts = products.slice(0);

  return clonedProducts.sort((a, b) =>
    totalPrice(a.price, a.discount) > totalPrice(b.price, b.discount) ? 1 : -1,
  );
};

const orderProductsFromMostExpensive = (products: Array<Product>) => {
  return orderProductsFromCheapest(products).reverse();
};

const orders: any = [
  {
    name: 'od nejlevnějšího',
    func: () => orderProductsFromCheapest,
  },
  {
    name: 'od nejdražšího',
    func: () => orderProductsFromMostExpensive,
  },
  {
    name: 'od nejnovějšího',
    func: () => orderProductsFromCheapest,
  },
  {
    name: 'od nejoblíbenějšího',
    func: () => orderProductsFromCheapest,
  },
  {
    name: 'od nejprodávanějšího',
    func: () => orderProductsFromCheapest,
  },
];

export default function ProductsSection({ setShowNotification, products, section }: { setShowNotification: Function, products: Array<Product>,section: String }) {
  const [sortFunc, setSortFunc] = React.useState<Function>(orders[0].func);
  const basket = useSelector(selectBasket);
  const productsWithQuantity = React.useMemo(
    () => addQuantityToProducts(basket.products, products),
    [products, basket],
  );
  const sortedProductsWithQuantity = sortFunc(productsWithQuantity);

  if (products.length === 0) return <></>

  return (
    <WrapperStyled>
      <SectionHeaderStyled>
        <SectionTitleStyled>{section}</SectionTitleStyled>
        <SectionOrderWrapperStyled>
          <SectionOrderTitleStyled>seřadit:</SectionOrderTitleStyled>
          <SectionOrderSelectStyled
            onChange={({ target }) =>
              setSortFunc(
                orders.filter(
                  (order: { name: string; func: Function }) =>
                    order.name === target.value,
                )[0].func,
              )
            }
          >
            {orders.map(
              (order: { name: string; func: Function }, index: number) => (
                <SectionOrderOptionStyled value={order.name} key={index}>
                  {order.name}
                </SectionOrderOptionStyled>
              ),
            )}
          </SectionOrderSelectStyled>
        </SectionOrderWrapperStyled>
      </SectionHeaderStyled>
      <ProductsWrapperStyled>
        {sortedProductsWithQuantity.map((product: Product, index: number) => (
          <ProductItem setShowNotification={setShowNotification} product={product} key={index} />
        ))}
      </ProductsWrapperStyled>
    </WrapperStyled>
  );
}
