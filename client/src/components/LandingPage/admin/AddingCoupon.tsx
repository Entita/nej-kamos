import React from 'react';
import { InputStyled, LabelStyled, RowWrapperStyled } from './AddingProduct.style';

export default function AddingCoupon({
  couponCode,
  couponDiscountAmount,
  couponDiscountPercent,
  setCouponCode,
  setCouponDiscountAmount,
  setCouponDiscountPercent,
}: any) {
  return (
    <>
      <input
        value={couponCode}
        onChange={({ target }) => setCouponCode(target.value.toUpperCase())}
        maxLength={6}
        placeholder='Coupon code'
      />
      <RowWrapperStyled>
        <input
          value={couponDiscountAmount}
          pattern="[0-9]*"
          onChange={({ target }) => target.validity.valid && setCouponDiscountAmount(Number(target.value))}
          maxLength={6}
          placeholder='Discount amount'
        /> Kč
      </RowWrapperStyled>
      <RowWrapperStyled>
        <InputStyled
          id='discountPercent'
          type='range'
          min={0}
          max={100}
          step={1}
          value={couponDiscountPercent}
          onChange={({ target }) => setCouponDiscountPercent(target.value)}
        />
        <LabelStyled htmlFor='discountPercent'>{`${couponDiscountPercent}% sleva`}</LabelStyled>
      </RowWrapperStyled>
    </>
  );
}
