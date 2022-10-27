import React from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { FieldTitle, FieldWrapper, FieldDesc, ExpandButtonStyled, DropdownStyled, WrapperStyled, TransactionInput, TransactionTitle, TransactionWrapper, BasketFieldWrapper, BasketFieldDesc, BasketWrapper, BasketFieldTitle, BasketFieldDiscount, BasketFieldDiscountText, BasketProductsWrapper, BasketPriceAmountStyled, BasketPriceTitleStyled, BasketPriceWrapperStyled } from './Order.style'
import { Product } from '../../models/client/Product';
import OrderProduct from './OrderProduct';
import { totalBasketPriceWithCoupon } from '../../utils/utils';

export default function Order({ transaction }: { transaction: any }) {
  const [openDropdown, setOpenDropdown] = React.useState<Boolean>(false);
  const [expandAngle, setExpandAngle] = React.useState<number>(180);
  const formatedDate = React.useMemo(
    () =>
      new Date(transaction.createdAt).toLocaleDateString('cs-CZ', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    [transaction],
  );

  return (
    <WrapperStyled>
      <FieldWrapper open={openDropdown} onClick={() => {
        setOpenDropdown((open) => !open);
        setExpandAngle(angle => angle - 180);
      }}>
        <FieldTitle>{formatedDate}</FieldTitle>
        <FieldDesc>{transaction.status}</FieldDesc>
        <ExpandButtonStyled open={openDropdown} angle={expandAngle}>
          <ExpandLessIcon />
        </ExpandButtonStyled>
      </FieldWrapper>
      <DropdownStyled open={openDropdown}>
        <TransactionWrapper>
          <TransactionTitle>ID</TransactionTitle>
          <TransactionInput value={transaction._id} readOnly />
        </TransactionWrapper>
        <TransactionWrapper>
          <TransactionTitle>Platba</TransactionTitle>
          <TransactionInput value={transaction.type} readOnly />
        </TransactionWrapper>
        <TransactionWrapper>
          <TransactionTitle>Košík</TransactionTitle>
          <BasketWrapper>
            <BasketFieldWrapper>
              <BasketFieldTitle>ID</BasketFieldTitle>
              <BasketFieldDesc>{transaction.basket._id}</BasketFieldDesc>
            </BasketFieldWrapper>
            {transaction.basket.coupon && <BasketFieldWrapper>
              <BasketFieldTitle>Kupón</BasketFieldTitle>
              <BasketFieldDesc>{transaction.basket.coupon}</BasketFieldDesc>
              <BasketFieldDiscount>
                <BasketFieldDiscountText>{`${transaction.basket.discount.amount && `${transaction.basket.discount.amount}%`}`}</BasketFieldDiscountText>
                <BasketFieldDiscountText>{`${transaction.basket.discount.percent && `${transaction.basket.discount.percent}Kč`}`}</BasketFieldDiscountText>
              </BasketFieldDiscount>
            </BasketFieldWrapper>}
            <BasketFieldWrapper>
              <BasketFieldTitle>Produkty</BasketFieldTitle>
              <BasketProductsWrapper>
                {transaction.basket.products.map((product: Product, index: number) =>
                  <OrderProduct product={product} key={index} />
                )}
              </BasketProductsWrapper>
              <BasketPriceWrapperStyled>
                <BasketPriceTitleStyled>Celkem</BasketPriceTitleStyled>
                <BasketPriceAmountStyled>{`${totalBasketPriceWithCoupon(transaction.basket)} Kč`}</BasketPriceAmountStyled>
              </BasketPriceWrapperStyled>
            </BasketFieldWrapper>
          </BasketWrapper>
        </TransactionWrapper>
      </DropdownStyled>
    </WrapperStyled>
  )
}
