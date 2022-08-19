import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from 'react-toastify';
import styled from 'styled-components';
import agent from '../../api/agent';
import { Product } from '../../models/Product';
import { formatTotalPrice, getServerUrl, totalBasketPrice, totalBasketPriceWithCoupon } from '../../utils/utils';
import NotFound from '../NotFoundPage/NotFound';
import { ButtonStyled, DescriptionLeftStyled, DescriptionRightStyled, DescriptionStyled, DescriptionWrapperStyled, ModalDiscountLeftStyled, ModalDiscountNameStyled, ModalDiscountRightStyled, ModalDiscountSpanStyled, ModalDiscountWrapperStyled, ModalPriceStyled, ModalPriceWrapperStyled, ModalProductImageStyled, ModalProductNameStyled, ModalProductPriceStyled, ModalProductQuantityStyled, ModalProductsStyled, ModalProductStyled, ModalTotalPriceStyled, PaymentButtonStyled, TitleStyled, WrapperStyled } from './OrderPage.style';

const LoadingStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 5rem);

  & > div {
    width: 8rem;
    height: 8rem;
    border-width: 1rem;
  }
`;

export default function OrderPage() {
  const [order, setOrder] = React.useState<any>();
  const [loading, setLoading] = React.useState<Boolean>(true);
  const query = useLocation().pathname;
  const transactionId = query.split('/order/')[1];
  const navigate = useNavigate();

  const cardPayment = async () => {
    await agent.Payment.create({ transactionId })
      .then((response) => !response.failed && (window.location.href = response.data));
  };

  React.useEffect(() => {
    agent.Transaction.get({ transactionId })
      .then((response) => {
        if (!response.failed) setOrder(response.data);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingStyled>{Icons.spinner()}</LoadingStyled>
  if (!order) return <NotFound />

  return (
    <WrapperStyled>
      <TitleStyled>Thank you for your order!</TitleStyled>
      <DescriptionStyled>
        <DescriptionWrapperStyled>
          <DescriptionLeftStyled>State:</DescriptionLeftStyled>
          <DescriptionRightStyled>{order.status}</DescriptionRightStyled>
        </DescriptionWrapperStyled>
        <DescriptionWrapperStyled>
          <DescriptionLeftStyled>Payment method:</DescriptionLeftStyled>
          <DescriptionRightStyled>{order.type}</DescriptionRightStyled>
        </DescriptionWrapperStyled>
        {order.type === 'card' &&  <PaymentButtonStyled onClick={cardPayment}>Pay now</PaymentButtonStyled>}
      </DescriptionStyled>
      <ModalProductsStyled>
        {order.basket.products.map((product: Product, index: number) => (
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
      {order.basket.discount && order.basket.coupon && <ModalDiscountWrapperStyled>
        <ModalDiscountLeftStyled>Discount:</ModalDiscountLeftStyled>
        <ModalDiscountRightStyled>
          <ModalDiscountNameStyled>
            {`${order.basket.coupon} ${order.basket.discount.percent > 0 ? `${order.basket.discount.percent}% ${order.basket.discount.amount > 0 ? `& ${order.basket.discount.amount} Kč` : ''}` : `${order.basket.discount.amount}Kč`} OFF`}
          </ModalDiscountNameStyled>
          <ModalDiscountSpanStyled>{`- ${(Number(totalBasketPrice(order.basket)) - Number(totalBasketPriceWithCoupon(order.basket))).toFixed(2)} Kč`}</ModalDiscountSpanStyled>
        </ModalDiscountRightStyled>
      </ModalDiscountWrapperStyled>}
      <ModalPriceWrapperStyled>
        <ModalTotalPriceStyled>Total:</ModalTotalPriceStyled>
        <ModalPriceStyled>{`${totalBasketPriceWithCoupon(order.basket)} Kč`}
      </ModalPriceStyled>
      </ModalPriceWrapperStyled>
      <ButtonStyled onClick={() => navigate('/')}>Go home</ButtonStyled>
    </WrapperStyled>
  );
}
