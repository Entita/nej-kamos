import React from 'react'
import { useSelector } from 'react-redux';
import { selectAccount } from '../../redux/account';
import { WrapperStyled } from './HistoryOfOrders.style'

export default function HistoryOfOrders() {
  const { transactions } = useSelector(selectAccount);

  return (
    <WrapperStyled>
      {transactions.map((transaction: any, index: number) => 
        <div key={index}>
          <span>{transaction._id}</span>
          <span>{transaction.type}</span>
          <span>{transaction.status}</span>
        </div>
      )}
    </WrapperStyled>
  )
}
