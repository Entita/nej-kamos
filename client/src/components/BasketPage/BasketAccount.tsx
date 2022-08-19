import React from 'react'
import { useSelector } from 'react-redux';
import FancyInput from '../Features/FancyInput/FancyInput';
import { AccountInputsWrapperStyled, ModalContentStyled, ModalTitleStyled } from './BasketAccount.style'

export default function BasketAccount() {
  const account = useSelector((state: any) => state.account.account);

  const phoneValidation = (input: String | Number) => {
    return input === String(Number(input));
  }

  return (
    <>
      <ModalTitleStyled>Account</ModalTitleStyled>
      <ModalContentStyled>
        <AccountInputsWrapperStyled>
          <FancyInput placeholder={'Jméno'} defaultValue={account?.firstname} size='medium' />
          <FancyInput placeholder={'Příjmení'} defaultValue={account?.surname} size='medium' />
        </AccountInputsWrapperStyled>
        <FancyInput placeholder={'Email'} defaultValue={account?.email} size='medium' />
        <FancyInput placeholder={'Telefon'} defaultValue={account?.phone} size='medium' validation={phoneValidation} />
      </ModalContentStyled>
    </>
  )
}
