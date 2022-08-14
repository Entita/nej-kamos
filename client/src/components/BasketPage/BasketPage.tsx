import React from 'react'
import { useSelector } from 'react-redux';
import EmptyBasket from '../EmptyBasketPage/EmptyBasket';
import BasketAccount from './BasketAccount';
import BasketCart from './BasketCart';
import BasketDelivery from './BasketDelivery';
import { ModalButtonWrapperStyled, ModalCompleteButtonStyled, ModalContentStyled, ModalIndexStyled, ModalNextButtonStyled, ModalPrevButtonStyled, ModalWrapperStyled, WrapperStyled } from './BasketPage.style';
import BasketPayment from './BasketPayment';

export default function BasketPage({ setShowCart }: { setShowCart: Function }) {
  const [modalIndex, setModalIndex] = React.useState<number>(0);
  const basket = useSelector((state: any) => state.basket);
  const modals = [<BasketCart basket={basket} setShowCart={setShowCart} />, <BasketAccount />, <BasketDelivery />, <BasketPayment />];

  if (basket.products.length === 0) return <EmptyBasket />

  return (
    <WrapperStyled>
      <ModalWrapperStyled>
        {[...Array(4)].map((n, index) =>
          <ModalIndexStyled onClick={() => setModalIndex(index)} index={modalIndex === index} key={index}>{index + 1}</ModalIndexStyled>
        )}
      </ModalWrapperStyled>
      <ModalContentStyled>
        {modals[modalIndex]}
        <ModalButtonWrapperStyled>
          {modalIndex > 0 && <ModalPrevButtonStyled onClick={() => setModalIndex(modalIndex - 1)}>Prev</ModalPrevButtonStyled>}
          {modalIndex < modals.length - 1 && <ModalNextButtonStyled onClick={() => setModalIndex(modalIndex + 1)}>Next</ModalNextButtonStyled>}
          {modalIndex >= modals.length - 1 && <ModalCompleteButtonStyled>Complete</ModalCompleteButtonStyled>}
      </ModalButtonWrapperStyled>
      </ModalContentStyled>
    </WrapperStyled>
  )
}
