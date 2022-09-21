import type { NextPage } from 'next';
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

import agent from '../utils/agent';
import { wrapper } from '../redux/store';
import { refreshBasket } from '../redux/basket';
import { refreshAccount, selectAccount } from '../redux/account';
import { setCookie } from 'cookies-next';
import Header from '../components/Header/Header';
import TopLogo from '../components/LandingPage/TopLogo';
import MenuSection from '../components/LandingPage/MenuSection';
import { refreshCategories } from '../redux/categories';
import Search from '../components/LandingPage/Search';
import Support from '../components/Support/Support';
import Head from 'next/head';
import { refreshProducts, selectProducts } from '../redux/products';
import ProductsSection from '../components/LandingPage/ProductsSection';
import { useSelector } from 'react-redux';
import { Product } from '../models/client/Product';
import Notification from '../components/Notification/Notification';

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 10%;
`;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    axios.defaults.headers.common['precookie'] = JSON.stringify(
      context.req.cookies,
    );
    const basket = await agent.Basket.get();
    const account = await agent.Account.get();
    const categories = await agent.Category.get();
    const products = await agent.Product.get();
    delete axios.defaults.headers.common['precookie'];

    if (!basket.failed) {
      store.dispatch(refreshBasket(basket.data));
      store.dispatch(refreshCategories(categories));
      store.dispatch(refreshProducts(products));
      if (basket)
        setCookie('basketId', basket.data._id, {
          req: context.req,
          res: context.res,
        });
      if (account) {
        store.dispatch(refreshAccount(account.data));
        setCookie('accountId', account.data._id, {
          req: context.req,
          res: context.res,
        });
      }
    }

    return {
      props: {},
    };
  },
);

const Home: NextPage = () => {
  const [modal, setModal] = React.useState<string>('');
  const [showNotification, setShowNotification] = React.useState<boolean>(false);
  const account = useSelector(selectAccount);
  const products = useSelector(selectProducts);

  const getFavoriteProducts = () => {
    if (!account) return [];

    return products.filter((product: Product) => account.favorites.includes(product._id));
  };

  return (
    <>
      <Head>
        <title>Nej kámoš</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {showNotification && <Notification setShow={setShowNotification} setModal={setModal} />}

      <Header modal={modal} setModal={setModal} />
      <TopLogo />
      <LandingPageWrapper>
        <MenuSection />
        <Search />
        <ProductsSection setShowNotification={setShowNotification} products={getFavoriteProducts()} section='Oblíbené' />
        <ProductsSection setShowNotification={setShowNotification} products={products} section='Doporučené' />
      </LandingPageWrapper>
      <Support />
    </>
  );
};

export default Home;
