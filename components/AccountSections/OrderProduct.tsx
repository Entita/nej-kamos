import React from 'react'
import { Product } from '../../models/client/Product'
import { formatTotalPrice } from '../../utils/utils'
import { ProductImageStyled, ProductNameStyled, ProductPriceStyled, ProductQuantityStyled, ProductWrapperStyled, WrapperStyled } from './OrderProduct.style'

export default function OrderProduct({ product }: { product: Product}) {

  return (
    <WrapperStyled>
      <ProductWrapperStyled>
        <ProductImageStyled imageUrl={product.imageUrl} />
        <ProductNameStyled>{product.name}</ProductNameStyled>
        <ProductQuantityStyled>{`${product.quantity}x`}</ProductQuantityStyled>
        <ProductPriceStyled>{`${formatTotalPrice(product.price, product.discount, product.quantity)} Kč`}</ProductPriceStyled>
      </ProductWrapperStyled>
    </WrapperStyled>
  )
}
