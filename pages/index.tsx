import type { NextPage } from 'next';
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

import agent from '../utils/agent';
import { wrapper } from '../redux/store';
import { refreshBasket } from '../redux/basket';
import { refreshAccount } from '../redux/account';
import { setCookie } from 'cookies-next';
import Header from '../components/Header/Header';
import TopSection from '../components/LandingPage/TopSection';
import MenuSection from '../components/LandingPage/MenuSection';
import { refreshCategories } from '../redux/categories';
import Search from '../components/LandingPage/Search';
import Support from '../components/Support/Support';
import Head from 'next/head';

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
    delete axios.defaults.headers.common['precookie'];

    if (!basket.failed) {
      store.dispatch(refreshBasket(basket.data));
      store.dispatch(refreshCategories(categories));
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
  return (
    <>
      <Head>
        <title>Nej kámoš</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />
      <TopSection />
      <LandingPageWrapper>
        <MenuSection />
        <Search />
      </LandingPageWrapper>
      <Support />
    </>
  );
};

export default Home;
