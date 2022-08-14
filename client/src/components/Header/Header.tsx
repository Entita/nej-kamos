import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {
  AccountBlockStyled,
  AccountTitleStyled,
  ActionBlockStyled,
  CartBlockStyled,
  CartQuantityStyled,
  CartQuantityTitleStyled,
  CartStyled,
  LogoStyled,
  LogoutButtonStyled,
  LogoutTitleStyled,
  PriceStyled,
  WrapperStyled,
} from './Header.style';
import Search from './Search';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { totalBasketPrice, totalQuantity } from '../../utils/utils';
import AccountModal from './AccountModal';
import { asyncLogout } from '../../redux/account';
import { useDispatch } from 'react-redux';

interface Props {
  onCartClick: Function;
}

export default function Header({ onCartClick }: Props) {
  const [showAccountModal, setShowAccountModal] = React.useState<boolean>(false); // prettier-ignore
  const basket = useSelector((state: any) => state.basket);
  const account = useSelector((state: any) => state.account.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <WrapperStyled>
      <Search />
      <LogoStyled onClick={() => navigate('/')}>Nej kámoš</LogoStyled>
      <ActionBlockStyled>
        {(showAccountModal && !account) && <AccountModal setShowAccountModal={setShowAccountModal} />}
        <AccountBlockStyled onClick={() => account ? navigate('/account') : setShowAccountModal(true)}>
          <AccountBoxIcon fontSize='large' />
          <AccountTitleStyled>{account ? 'My account' : 'Login'}</AccountTitleStyled>
        </AccountBlockStyled>
        {account && <LogoutButtonStyled onClick={() => {
          asyncLogout(dispatch);
          setShowAccountModal(false);
          }}>
          <LogoutIcon fontSize='large' />
          <LogoutTitleStyled>Logout</LogoutTitleStyled>
        </LogoutButtonStyled>}
        <CartBlockStyled onClick={() => onCartClick()}>
          <CartStyled>
            <ShoppingCartOutlinedIcon fontSize='large' />
            <CartQuantityStyled>
              <CartQuantityTitleStyled>
                {totalQuantity(basket)}
              </CartQuantityTitleStyled>
            </CartQuantityStyled>
          </CartStyled>
          <PriceStyled>{`${totalBasketPrice(basket)} Kč`}</PriceStyled>
        </CartBlockStyled>
      </ActionBlockStyled>
    </WrapperStyled>
  );
}
