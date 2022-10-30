import React from 'react'
import AccountDropdown from './AccountDropdown'
import AccountEdit from './AccountEdit';
import AccountInfo from './AccountInfo';
import { WrapperStyled } from './AccountSection.style'
import HistoryOfOrders from './HistoryOfOrders';

export default function AccountSections() {
  return (
    <WrapperStyled>
      <AccountDropdown title='Account' description='info'>
        <AccountInfo />
      </AccountDropdown>
      <AccountDropdown title='Loyalty' description='points'>Pracujeme na tom</AccountDropdown>
      <AccountDropdown title='History' description='of orders'>
        <HistoryOfOrders />
      </AccountDropdown>
      <AccountDropdown title='Profile' description='editing'>
        <AccountEdit />
      </AccountDropdown>
    </WrapperStyled>
  )
}
