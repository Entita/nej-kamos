import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Icons } from 'react-toastify';
import styled from 'styled-components';
import { asyncRefreshAccount } from '../redux/account';
import { asyncRefreshBasket } from '../redux/basket';
import { asyncRefreshCategories } from '../redux/categories';
import { asyncRefreshProducts } from '../redux/products';
import { asyncRefreshSubcategories } from '../redux/subcategories';
import AccountPage from './AccountPage/AccountPage';
import BasketPage from './BasketPage/BasketPage';
import SideCart from './Cart/Cart';
import Header from './Header/Header';
import LandingPage from './LandingPage/LandingPage';
import NotFound from './NotFoundPage/NotFound';
import ProductPage from './ProductPage/ProductPage';
import ResetPasswordPage from './ResetPassword/ResetPasswordPage';
import VerificationPage from './VerificationPage/VerificationPage';

const LoadingStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 5rem);

  & > div {
    width: 8rem;
    height: 8rem;
    border-width: 1rem;
  }
`;

export default function AppRouter() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = React.useState<Boolean>(false);
  const [loading, setLoading] = React.useState<Boolean>(true);

  React.useEffect(() => {
    const initialization = async () => {
      await asyncRefreshBasket(dispatch);
      await asyncRefreshProducts(dispatch);
      await asyncRefreshCategories(dispatch);
      await asyncRefreshSubcategories(dispatch);
      await asyncRefreshAccount(dispatch);
      setLoading(false);
    };

    initialization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Header onCartClick={() => setShowCart(!showCart)} />
      <SideCart showCart={showCart} setShowCart={() => setShowCart(false)} />
      {loading
        ? 
          <LoadingStyled>{Icons.spinner()}</LoadingStyled>
        :
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/product/*' element={<ProductPage />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path='/basket' element={<BasketPage setShowCart={() => setShowCart(true)} />} />
            <Route path='/verification/*' element={<VerificationPage />} />
            <Route path='/passwordReset/*' element={<ResetPasswordPage />} />
            <Route path='*' element={<NotFound />} />;
          </Routes>}
    </BrowserRouter>
  );
}
