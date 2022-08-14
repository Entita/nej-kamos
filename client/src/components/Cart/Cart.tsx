import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  CartBottomStyled,
  CartMiddleStyled,
  CartPriceStyled,
  CartPriceWrapperStyled,
  CartProductsStyled,
  CartTitleStyled,
  CartTopStyled,
  CartTotalPriceStyled,
  CloseButtonStyled,
  OrderButtonStyled,
  WrapperStyled,
} from './Cart.style';
import CartProduct from './CartProduct';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Product } from '../../models/Product';
import { totalBasketPrice } from '../../utils/utils';

interface Props {
  showCart: Boolean;
  setShowCart: Function;
}

export default function SideCart({ showCart, setShowCart }: Props) {
  const navigate = useNavigate();
  const basket = useSelector((state: any) => state.basket);

  return (
    <>
      <WrapperStyled className={showCart && 'open'}>
        <CartTopStyled>
          <CartTitleStyled>Shopping cart</CartTitleStyled>
          <CloseButtonStyled onClick={() => setShowCart()}>
            <CloseRoundedIcon fontSize='medium' color='disabled' />
          </CloseButtonStyled>
        </CartTopStyled>
        <CartMiddleStyled>
          <CartProductsStyled>
            {basket.products.map((product: Product, index: number) => (
              <CartProduct key={index} product={product} />
            ))}
          </CartProductsStyled>
        </CartMiddleStyled>
        <CartBottomStyled>
          <CartPriceWrapperStyled>
            <CartTotalPriceStyled>Total:</CartTotalPriceStyled>
            <CartPriceStyled>{`${totalBasketPrice(basket)} Kč`}</CartPriceStyled>
          </CartPriceWrapperStyled>
          <OrderButtonStyled
            onClick={() => {
              setShowCart(false);
              navigate('/basket');
            }}
          >
            To the order
          </OrderButtonStyled>
        </CartBottomStyled>
      </WrapperStyled>
    </>
  );
}
