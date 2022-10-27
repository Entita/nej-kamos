import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccount } from '../../redux/account';
import { WrapperStyled } from './HistoryOfOrders.style'
import Order from './Order';

export default function HistoryOfOrders() {
  const { transactions } = useSelector(selectAccount);

  return (
    <WrapperStyled>
      {transactions.map((transaction: any, index: number) => 
        <Order key={index} transaction={transaction} />
      )}
    </WrapperStyled>
  )
}
