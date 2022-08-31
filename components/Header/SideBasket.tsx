import React from 'react'
import Router from 'next/router';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import BasketSvg from '../SVG/BasketSvg';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../redux/basket';
import { formatTotalPrice, getServerUrl, totalBasketPrice } from '../../utils/utils';
import { Product } from '../../models/client/Product';
import {
  BasketBodyStyled,
  BasketButtonStyled,
  BasketCloseStyled,
  BasketFooterHorizontalStyled,
  BasketFooterStyled,
  BasketHeaderStyled,
  BasketPriceStyled,
  BasketPriceTitleStyled,
  BasketProductNameStyled,
  BasketProductPriceStyled,
  BasketProductStyled,
  BasketTitleStyled,
  ProductImageStyled,
  ProductQuantityStyled,
  WrapperStyled,
} from './SideBasket.style';
import ProductQuantity from '../ProductQuantity/ProductQuantity';

export default function SideBasket({ showBasket, setShowBasket }: { showBasket: boolean; setShowBasket: Function; }) {
  const basket = useSelector(selectBasket);

  return (
    <WrapperStyled show={showBasket}>
      <BasketHeaderStyled>
        <BasketCloseStyled onClick={() => setShowBasket(false)}>
          <CloseRoundedIcon />
        </BasketCloseStyled>
        <BasketTitleStyled>Nákupní košík</BasketTitleStyled>
      </BasketHeaderStyled>
      <BasketBodyStyled>
        {basket.products.map((product: Product, index: number) =>
          <BasketProductStyled key={index}>
            <ProductImageStyled imageUrl={getServerUrl() + product.imageUrl} />
            <BasketProductNameStyled href={`/product/${product._id}`}>
              {product.name}
            </BasketProductNameStyled>
            <BasketProductPriceStyled>
              {`${formatTotalPrice(product.price, product.discount, product.quantity)} Kč`}
            </BasketProductPriceStyled>
            <ProductQuantityStyled>
              <ProductQuantity product={product} type='basket' />
            </ProductQuantityStyled>
          </BasketProductStyled>
        )}
      </BasketBodyStyled>
      <BasketFooterStyled>
        <BasketFooterHorizontalStyled>
          <BasketPriceTitleStyled>Celkem bez dopravy</BasketPriceTitleStyled>
          <BasketPriceStyled>{`${totalBasketPrice(basket)} Kč`}</BasketPriceStyled>
        </BasketFooterHorizontalStyled>
        <BasketButtonStyled onClick={() => Router.push('/basket')}>
          <BasketSvg color='white' size='small' />
          Přejít do košíku
        </BasketButtonStyled>
      </BasketFooterStyled>
    </WrapperStyled>
  )
}
