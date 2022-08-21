import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProduct } from '../../redux/products';
import {
  LeftSideStyled,
  ProductPriceBlockStyled,
  ProductDescriptionStyled,
  ProductDescriptionTitleStyled,
  ProductDiscountStyled,
  ProductImageStyled,
  ProductNameStyled,
  ProductPriceStyled,
  ProductQuantityBlockStyled,
  ProductStockStyled,
  ProductTopStyled,
  RightSideStyled,
  WrapperStyled,
  ProductBottomStyled,
  ProductDescriptionBlockStyled,
} from './ProductPage.style';
import { getServerUrl, formatTotalPrice } from '../../utils/utils';
import ProductQuantity from '../Features/ProductQuantity/ProductQuantity';
import NotFound from '../NotFoundPage/NotFound';

export default function ProductPage() {
  const query = useLocation().pathname;
  const productId = query.split('/product/')[1];
  const basket = useSelector((state: any) => state.basket.basket);
  const basketProduct = getProduct(basket.products, productId);
  const products = useSelector((state: any) => state.products.products);
  const product = {
    ...getProduct(products, productId),
    quantity: basketProduct?.quantity || 0,
  };

  if (!product) return <NotFound />

  return (
    <WrapperStyled>
      <LeftSideStyled>
        <ProductImageStyled imageUrl={getServerUrl() + product.imageUrl} />
      </LeftSideStyled>
      <RightSideStyled>
        <ProductTopStyled>
          <ProductNameStyled>{product.name}</ProductNameStyled>
        </ProductTopStyled>
        <ProductBottomStyled>
          <ProductPriceBlockStyled>
            <ProductPriceStyled
              discount={
                product.discount.amount > 0 || product.discount.percent > 0
              }
            >
              ${product.price.toFixed(2)}
            </ProductPriceStyled>
            {(product.discount.amount > 0 || product.discount.percent > 0) && (
              <ProductDiscountStyled>{`${formatTotalPrice(
                product.price,
                product.discount,
              )} Kč`}</ProductDiscountStyled>
            )}
          </ProductPriceBlockStyled>
          <ProductQuantityBlockStyled>
            <ProductQuantity product={product} type='product_page' />
            ks /{' '}
            <ProductStockStyled>
              {product.stock} ks ve skladu
            </ProductStockStyled>
          </ProductQuantityBlockStyled>
          <ProductDescriptionBlockStyled>
            <ProductDescriptionTitleStyled>
              Popis produktu
            </ProductDescriptionTitleStyled>
            <ProductDescriptionStyled>
              {`Categorie: ${product.category}`}
              <br />
              {`Subcategorie: ${product.subcategory}`}
              <br />
              {product.description}
            </ProductDescriptionStyled>
          </ProductDescriptionBlockStyled>
        </ProductBottomStyled>
      </RightSideStyled>
    </WrapperStyled>
  );
}
