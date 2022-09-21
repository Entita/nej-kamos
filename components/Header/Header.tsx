import React from 'react';
import Router from 'next/router';
import BasketSvg from '../SVG/BasketSvg';
import {
  AccountButtonStyled,
  BasketNumberStyled,
  BasketNumberWrapperStyled,
  BasketWrapperStyled,
  LoginButtonStyled,
  LogoutButtonStyled,
  RegisterButtonStyled,
  WrapperStyled,
} from './Header.style';
import { Color } from '../../utils/colors';
import { useSelector } from 'react-redux';
import { selectBasket } from '../../redux/basket';
import { asyncLogout, selectAccount } from '../../redux/account';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { useDispatch } from 'react-redux';
import SideBasket from './SideBasket';
import { changeShowBasket, selectStates } from '../../redux/states';

export default function Header({ modal, setModal }: { modal: string, setModal: Function }) {
  const states = useSelector(selectStates);
  const [showBasket, setShowBasket] = React.useState<boolean>(states.showBasket);
  const basket = useSelector(selectBasket);
  const account = useSelector(selectAccount);
  const dispatch = useDispatch();
  
  const toggleBasket = (state: boolean) => {
    changeShowBasket(dispatch, state);
    setShowBasket(state);
  }

  const logout = async () => {
    await asyncLogout(dispatch);
  }

  return (
    <>
      <SideBasket showBasket={showBasket} setShowBasket={toggleBasket} />
      <WrapperStyled>
      {account ? (
          <>
            <AccountButtonStyled onClick={() => Router.push('/basket')}>můj účet</AccountButtonStyled>
            <LogoutButtonStyled onClick={logout}>odhlásit se</LogoutButtonStyled>
          </>
        ) : (
          <>
            <RegisterButtonStyled onClick={() => setModal('register')}>registrace</RegisterButtonStyled>
            <LoginButtonStyled onClick={() => setModal('login')}>přihlášení</LoginButtonStyled>
          </>
        )}
        <BasketWrapperStyled onClick={() => toggleBasket(!showBasket)}>
          <BasketNumberWrapperStyled>
            <BasketNumberStyled>{basket?.products.length || 0}</BasketNumberStyled>
          </BasketNumberWrapperStyled>
          <BasketSvg color={Color.mainYellow} />
        </BasketWrapperStyled>
      </WrapperStyled>
      {modal === 'login' && <LoginModal setModal={setModal} />}
      {modal === 'register' && <RegisterModal setModal={setModal} />}
    </>
  );
}
