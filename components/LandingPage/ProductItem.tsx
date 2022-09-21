import React from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
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
import { asyncFavoriteProductToAccount, asyncUnfavoriteProductToAccount, selectAccount } from '../../redux/account';

export default function ProductItem({ product, setShowNotification }: { product: Product, setShowNotification: Function }) {
  const account = useSelector(selectAccount);
  const dispatch = useDispatch();
  const isProductFavorite = React.useMemo(
    () => account && account.favorites.includes(product._id),
    [account],
  );

  const toggleFavorite = async () => {
    if (!account) return setShowNotification(true);

    if (isProductFavorite) await asyncUnfavoriteProductToAccount(dispatch, { productId: product._id });
    else await asyncFavoriteProductToAccount(dispatch, { productId: product._id });
  }

  return (
    <ProductWrapperStyled>
      <ProductTopWrapperStyled>
        <ProductFavoriteStyled onClick={toggleFavorite}>
          {isProductFavorite ? (
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
