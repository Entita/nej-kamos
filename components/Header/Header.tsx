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

export default function Header() {
  const [modal, setModal] = React.useState<string>('');
  const [showBasket, setShowBasket] = React.useState<boolean>(false);
  const basket = useSelector(selectBasket);
  const account = useSelector(selectAccount);
  const dispatch = useDispatch();

  const logout = async () => {
    await asyncLogout(dispatch);
  }

  return (
    <>
      <SideBasket showBasket={showBasket} setShowBasket={setShowBasket} />
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
        <BasketWrapperStyled onClick={() => setShowBasket(!showBasket)}>
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
