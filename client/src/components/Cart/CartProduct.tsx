import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getServerUrl, formatTotalPrice } from '../../utils/utils';
import ProductQuantity from '../Features/ProductQuantity/ProductQuantity';
import {
  ProductImageStyled,
  ProductInfoBottomStyled,
  ProductInfoStyled,
  ProductInfoTopStyled,
  ProductNameStyled,
  ProductPriceStyled,
  ProductQuantityStyled,
  WrapperStyled,
} from './CartProduct.style';

interface Props {
  product: any;
}

export default function CartProduct({ product }: Props) {
  const navigate = useNavigate();

  return (
    <WrapperStyled>
      <ProductImageStyled
        alt={product.name}
        imageUrl={getServerUrl() + product.imageUrl}
      />
      <ProductInfoStyled>
        <ProductInfoTopStyled>
          <ProductNameStyled onClick={() => navigate(`/product/${product._id}`)}>
            {product.name}
          </ProductNameStyled>
          
        </ProductInfoTopStyled>
        <ProductInfoBottomStyled>
          <ProductQuantityStyled>
            <ProductQuantity product={product} type='cart' />
          </ProductQuantityStyled>
          <ProductPriceStyled>{`${formatTotalPrice(
            product.price,
            product.discount,
            product.quantity,
          )} Kč`}</ProductPriceStyled>
        </ProductInfoBottomStyled>
      </ProductInfoStyled>
    </WrapperStyled>
  );
}
