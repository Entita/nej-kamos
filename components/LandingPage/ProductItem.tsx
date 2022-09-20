import React from 'react';
import Router from 'next/router';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Product } from '../../models/client/Product';
import {
  ProductBottomWrapperStyled,
  ProductDiscountStyled,
  ProductDiscountWrapperStyled,
  ProductFavoriteStyled,
  ProductImageStyled,
  ProductNameStyled,
  ProductPriceStyled,
  ProductStockNumberStyled,
  ProductStockStyled,
  ProductStockWrapperStyled,
  ProductTopWrapperStyled,
  ProductWrapperStyled,
} from './ProductItem.style';
import { formatTotalPrice, getServerUrl } from '../../utils/utils';
import ProductQuantity from '../ProductQuantity/ProductQuantity';

export default function ProductItem({ product }: { product: Product }) {
  return (
    <ProductWrapperStyled>
      <ProductTopWrapperStyled>
        <ProductFavoriteStyled>
          {product.favorite ? (
            <FavoriteIcon color='error' />
          ) : (
            <FavoriteBorderIcon color='error' />
          )}
        </ProductFavoriteStyled>
        <ProductImageStyled onClick={() => Router.push(`/product/${product._id}`)} imageUrl={getServerUrl() + product.imageUrl} />
      </ProductTopWrapperStyled>
      <ProductBottomWrapperStyled>
        <ProductNameStyled onClick={() => Router.push(`/product/${product._id}`)}>{product.name}</ProductNameStyled>
        <ProductDiscountWrapperStyled>
          <ProductDiscountStyled>{`${product.price.toFixed(2)} Kč`}</ProductDiscountStyled>
          <ProductPriceStyled>{`${formatTotalPrice(
            product.price,
            product.discount,
            )} Kč`}</ProductPriceStyled>
        </ProductDiscountWrapperStyled>
        <ProductStockWrapperStyled>
          <ProductStockStyled stock={product.stock}>
            {product.stock <= 0 && 'není'} skladem
          </ProductStockStyled>
          <ProductStockNumberStyled>{`(${product.stock})`}</ProductStockNumberStyled>
        </ProductStockWrapperStyled>
        <ProductQuantity product={product} type='landing_page' />
      </ProductBottomWrapperStyled>
    </ProductWrapperStyled>
  );
}
