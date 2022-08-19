import React from 'react'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { ModalContentStyled, ModalTitleStyled, PaymentButtonStyled } from './BasketPayment.style'

export default function BasketPayment({ paymentType, setPaymentType }: { paymentType: string, setPaymentType: Function }) {
  return (
    <>
      <ModalTitleStyled>Payment</ModalTitleStyled>
      <ModalContentStyled>
        <PaymentButtonStyled focused={paymentType === 'card'} onClick={() => setPaymentType('card')}>
          Card
          <CreditCardIcon />
        </PaymentButtonStyled>
        <PaymentButtonStyled focused={paymentType === 'bank'} onClick={() => setPaymentType('bank')}>
          Banka
          <AccountBalanceIcon />
        </PaymentButtonStyled>
        <PaymentButtonStyled focused={paymentType === 'cod'} onClick={() => setPaymentType('cod')}>
          Dobírka
          <LocalAtmIcon />
        </PaymentButtonStyled>
      </ModalContentStyled>
    </>
  )
}
