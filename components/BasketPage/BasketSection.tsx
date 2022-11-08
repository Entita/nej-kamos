import React from 'react'
import { useSelector } from 'react-redux'
import { Product } from '../../models/client/Product';
import { selectBasket } from '../../redux/basket'
import { formatTotalPrice, totalBasketPriceWithCoupon } from '../../utils/utils';
import { BasketProductImageStyled, BasketProductNameStyled, BasketProductPriceStyled, BasketProductQuantityStyled, BasketProductWrapperStyled, PriceAmountStyled, PriceTitleStyled, PriceWrapperStyled, ProductsWrapperStyled, WrapperStyled } from './BasketSection.style'

const BasketProduct = ({ product }: { product: Product }) => {
  return (
    <BasketProductWrapperStyled>
      <BasketProductImageStyled imageUrl={product.imageUrl} />
      <BasketProductNameStyled>{product.name}</BasketProductNameStyled>
      <BasketProductQuantityStyled>{`${product.quantity}x`}</BasketProductQuantityStyled>
      <BasketProductPriceStyled>{`${formatTotalPrice(product.price, product.discount, product.quantity)} Kč`}</BasketProductPriceStyled>
    </BasketProductWrapperStyled>
  )
}

export default function BasketSection() {
  const basket = useSelector(selectBasket);

  return (
    <WrapperStyled>
      <ProductsWrapperStyled>
        {basket.products.map((product: Product, index: number) =>
          <BasketProduct key={index} product={product} />
        )}
      </ProductsWrapperStyled>
      <PriceWrapperStyled>
          <PriceTitleStyled>Celkem</PriceTitleStyled>
          <PriceAmountStyled>{`${totalBasketPriceWithCoupon(basket)} Kč`}</PriceAmountStyled>
      </PriceWrapperStyled>
    </WrapperStyled>
  )
}
