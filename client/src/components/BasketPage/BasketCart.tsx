import React from 'react';
import { useDispatch } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import { Basket } from '../../models/Basket';
import { Product } from '../../models/Product';
import { asyncApplyDiscountCode, asyncUnapplyDiscountCode } from '../../redux/basket';
import { formatTotalPrice, getServerUrl, totalBasketPrice, totalBasketPriceWithCoupon } from '../../utils/utils';
import {
  ModalBasketEditStyled,
  ModalButtonWrapperStyled,
  ModalContentStyled,
  ModalDiscountButtonStyled,
  ModalDiscountInputStyled,
  ModalDiscountLeftStyled,
  ModalDiscountNameStyled,
  ModalDiscountRightStyled,
  ModalDiscountSpanStyled,
  ModalDiscountUnapplyStyled,
  ModalDiscountWrapperStyled,
  ModalPriceStyled,
  ModalPriceWrapperStyled,
  ModalProductImageStyled,
  ModalProductNameStyled,
  ModalProductPriceStyled,
  ModalProductQuantityStyled,
  ModalProductsStyled,
  ModalProductStyled,
  ModalTitleStyled,
  ModalTotalPriceStyled,
} from './BasketCart.style';

export default function BasketCart({ basket, setShowCart }: { basket: Basket, setShowCart: Function }) {
  const [discountCode, setDiscountCode] = React.useState<string>('');
  const [discountError, setDiscountError] = React.useState<boolean>(false);
  const basketPrice = React.useMemo(() => totalBasketPrice(basket), [basket]);
  const basketPriceWCoupon = React.useMemo(() => totalBasketPriceWithCoupon(basket), [basket]);
  const dispatch = useDispatch();

  const checkDiscountCode = () => {
    if (discountCode.length === 0) return;

    asyncApplyDiscountCode(dispatch, discountCode)
      .then((data) => setDiscountError(!data));
  }

  const removeDiscountCode = () => {
    asyncUnapplyDiscountCode(dispatch);
  }

  return (
    <>
      <ModalTitleStyled>Basket</ModalTitleStyled>
      <ModalContentStyled>
        <ModalBasketEditStyled onClick={() => setShowCart()}>Edit basket</ModalBasketEditStyled>
        <ModalProductsStyled>
          {basket.products.map((product: Product, index: number) => (
            <ModalProductStyled key={index}>
              <ModalProductImageStyled
                imageUrl={getServerUrl() + product.imageUrl}
              />
              <ModalProductNameStyled>{product.name}</ModalProductNameStyled>
              <ModalProductQuantityStyled>{`${product.quantity}x`}</ModalProductQuantityStyled>
              <ModalProductPriceStyled>{`${formatTotalPrice(
                product.price,
                product.discount,
                product.quantity,
              )} Kč`}</ModalProductPriceStyled>
            </ModalProductStyled>
          ))}
        </ModalProductsStyled>
        <ModalButtonWrapperStyled>
          <ModalDiscountWrapperStyled>
            <ModalDiscountLeftStyled>
              <ModalDiscountInputStyled
                error={discountError}
                placeholder='Discount'
                value={discountCode}
                maxLength={6}
                onChange={({ target }) => setDiscountCode(target.value.toUpperCase())}
              />
              <ModalDiscountButtonStyled onClick={() => checkDiscountCode()}>Apply</ModalDiscountButtonStyled>
            </ModalDiscountLeftStyled>
            {basket.discount && <ModalDiscountRightStyled>
              <ModalDiscountUnapplyStyled onClick={removeDiscountCode}>
                <ClearIcon color='error' />
              </ModalDiscountUnapplyStyled>
              <ModalDiscountNameStyled>
                {`${basket.coupon} ${basket.discount.percent > 0 ? `${basket.discount.percent}% ${basket.discount.amount > 0 ? `& ${basket.discount.amount} Kč` : ''}` : `${basket.discount.amount}Kč`} OFF`}
              </ModalDiscountNameStyled>
              <ModalDiscountSpanStyled>{`- ${(Number(basketPrice) - Number(basketPriceWCoupon)).toFixed(2)} Kč`}</ModalDiscountSpanStyled>
            </ModalDiscountRightStyled>}
          </ModalDiscountWrapperStyled>
          <ModalPriceWrapperStyled>
            <ModalTotalPriceStyled>Total:</ModalTotalPriceStyled>
            <ModalPriceStyled>{`${basketPriceWCoupon} Kč`}
          </ModalPriceStyled>
          </ModalPriceWrapperStyled>
        </ModalButtonWrapperStyled>
      </ModalContentStyled>
    </>
  );
}
