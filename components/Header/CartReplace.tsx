import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  CancelButtonStyled,
  CartReplaceBasketButtonStyled,
  CartReplaceBasketPriceAmountStyled,
  CartReplaceBasketPriceContainerStyled,
  CartReplaceBasketPriceTitleStyled,
  CartReplaceBasketsContainerStyled,
  CartReplaceBasketsTitleStyled,
  CartReplaceBasketStyled,
  CartReplaceBasketTitleStyled,
  CartReplaceBasketWrapperStyled,
  CartReplaceProductImageStyled,
  CartReplaceProductNameStyled,
  CartReplaceProductPriceStyled,
  CartReplaceProductQuantityStyled,
  CartReplaceProductStyled,
  ContainerStyled,
  WrapperStyled,
} from './CartReplace.style';
import { formatTotalPrice, getServerUrl, totalBasketPrice } from '../../utils/utils';
import { asyncAccountReplaceBasket } from '../../redux/account';
import { useDispatch } from 'react-redux';
import { Basket } from '../../models/client/Basket';
import { Product } from '../../models/client/Product';

interface Props {
  setCartReplaceData: Function;
  accountId: string,
  accountBasket: Basket;
  cookieBasket: Basket;
}

function CartReplaceBasket({ products }: { products: Array<Product> }) {
  return (
    <CartReplaceBasketStyled>
      {products.map((product, index) => (
        <CartReplaceProductStyled key={index}>
          <CartReplaceProductImageStyled
            imageUrl={getServerUrl() + product.imageUrl}
          />
          <CartReplaceProductNameStyled>
            {product.name}
          </CartReplaceProductNameStyled>
          <CartReplaceProductQuantityStyled>{`${product.quantity}x`}</CartReplaceProductQuantityStyled>
          <CartReplaceProductPriceStyled>{`${formatTotalPrice(
            product.price,
            product.discount,
            product.quantity,
          )} Kč`}</CartReplaceProductPriceStyled>
        </CartReplaceProductStyled>
      ))}
    </CartReplaceBasketStyled>
  );
}

export default function CartReplace({
  setCartReplaceData,
  accountId,
  accountBasket,
  cookieBasket,
}: Props) {

  const bgRef = React.useRef(null);
  const dispatch = useDispatch();

  const replaceBasket = async (basketId: string) => {
    await asyncAccountReplaceBasket(dispatch, { accountId, basketId })
      .then(() => setCartReplaceData(null));
  };

  return (
    <WrapperStyled
      ref={bgRef}
      onClick={({ target }) =>
        target === bgRef.current && setCartReplaceData(null)
      }
    >
      <ContainerStyled>
        <CancelButtonStyled onClick={() => setCartReplaceData(null)}>
          <CloseRoundedIcon color='error' />
        </CancelButtonStyled>
        <CartReplaceBasketsTitleStyled>Zvolte košík se kterým chcete pokračovat:</CartReplaceBasketsTitleStyled>
        <CartReplaceBasketsContainerStyled>
          <CartReplaceBasketWrapperStyled>
            <CartReplaceBasketTitleStyled>Košík na účtě</CartReplaceBasketTitleStyled>
            <CartReplaceBasket products={accountBasket.products} />
            <CartReplaceBasketPriceContainerStyled>
              <CartReplaceBasketPriceTitleStyled>Celkem:</CartReplaceBasketPriceTitleStyled>
              <CartReplaceBasketPriceAmountStyled>{`${totalBasketPrice(accountBasket)} Kč`}</CartReplaceBasketPriceAmountStyled>
            </CartReplaceBasketPriceContainerStyled>
            <CartReplaceBasketButtonStyled onClick={() => replaceBasket(accountBasket._id)}>Zvolit</CartReplaceBasketButtonStyled>
          </CartReplaceBasketWrapperStyled>
          <CartReplaceBasketWrapperStyled>
            <CartReplaceBasketTitleStyled>Košík mimo účet</CartReplaceBasketTitleStyled>
            <CartReplaceBasket products={cookieBasket.products} />
            <CartReplaceBasketPriceContainerStyled>
              <CartReplaceBasketPriceTitleStyled>Celkem:</CartReplaceBasketPriceTitleStyled>
              <CartReplaceBasketPriceAmountStyled>{`${totalBasketPrice(cookieBasket)} Kč`}</CartReplaceBasketPriceAmountStyled>
            </CartReplaceBasketPriceContainerStyled>
            <CartReplaceBasketButtonStyled onClick={() => replaceBasket(cookieBasket._id)}>Zvolit</CartReplaceBasketButtonStyled>
          </CartReplaceBasketWrapperStyled>
        </CartReplaceBasketsContainerStyled>
      </ContainerStyled>
    </WrapperStyled>
  );
}
