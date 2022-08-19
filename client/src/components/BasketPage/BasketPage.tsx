import React from 'react'
import { useSelector } from 'react-redux';
import EmptyBasket from '../EmptyBasketPage/EmptyBasket';
import BasketAccount from './BasketAccount';
import BasketCart from './BasketCart';
import BasketDelivery from './BasketDelivery';
import BasketPayment from './BasketPayment';
import {
  ModalButtonWrapperStyled,
  ModalCompleteButtonStyled,
  ModalContentStyled,
  ModalIndexStyled,
  ModalNextButtonStyled,
  ModalPrevButtonStyled,
  ModalWrapperStyled,
  WrapperStyled,
} from './BasketPage.style';
import agent from '../../api/agent';
import { useNavigate } from 'react-router-dom';
import Cookie from '../../utils/utils';
import { asyncRefreshAccount } from '../../redux/account';
import { useDispatch } from 'react-redux';
import { asyncRefreshBasket } from '../../redux/basket';

export default function BasketPage({ setShowCart }: { setShowCart: Function }) {
  const [paymentType, setPaymentType] = React.useState<string>('');
  const [modalIndex, setModalIndex] = React.useState<number>(0);
  const basket = useSelector((state: any) => state.basket.basket);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modals = [
    ['cart', <BasketCart basket={basket} setShowCart={setShowCart} />],
    ['account', <BasketAccount />],
    ['delivery', <BasketDelivery />],
    ['payment', <BasketPayment paymentType={paymentType} setPaymentType={setPaymentType} />]
  ];
  
  const changeModal = (index: number) => {
    if (modalIndex === index) return;

    setModalIndex(index);
  };

  const makePayment = async () => {
    if (paymentType === '') return;

    await agent.Transaction.create({ type: paymentType })
      .then(async (response) => {
        if (!response.failed) {
          if (Cookie.accountId()) {
            await asyncRefreshAccount(dispatch);
          }
          await asyncRefreshBasket(dispatch);
          navigate(`/order/${response.data}`)
        };
      });
  };

  if (basket.products.length === 0) return <EmptyBasket />

  return (
    <WrapperStyled>
      <ModalWrapperStyled>
        {[...Array(4)].map((n, index) =>
          <ModalIndexStyled onClick={() => changeModal(index)} index={modalIndex === index} key={index}>{index + 1}</ModalIndexStyled>
        )}
      </ModalWrapperStyled>
      <ModalContentStyled>
        {modals[modalIndex][1]}
        <ModalButtonWrapperStyled>
          {modalIndex > 0 && <ModalPrevButtonStyled onClick={() => changeModal(modalIndex - 1)}>Prev</ModalPrevButtonStyled>}
          {modalIndex < modals.length - 1 && <ModalNextButtonStyled onClick={() => changeModal(modalIndex + 1)}>Next</ModalNextButtonStyled>}
          {modalIndex >= modals.length - 1 && <ModalCompleteButtonStyled onClick={() => makePayment()}>Complete</ModalCompleteButtonStyled>}
      </ModalButtonWrapperStyled>
      </ModalContentStyled>
    </WrapperStyled>
  )
}
