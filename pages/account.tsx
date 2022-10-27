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
import { refreshCategories } from '../redux/categories';
import Support from '../components/Support/Support';
import Head from 'next/head';
import { refreshProducts } from '../redux/products';
import CornerLogo from '../components/ProductPage/CornerLogo';
import AccountSections from '../components/AccountSections/AccountSections';

const AccountPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 10rem);
  padding-top: 10rem;
  padding-bottom: 1rem;
  align-items: center;
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

const AccountPage: NextPage = () => {
  const [modal, setModal] = React.useState<string>('');

  return (
    <>
      <Head>
        <title>Nej kámoš</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="../images/favicon.ico" />
      </Head>

      <Header modal={modal} setModal={setModal} />
      <Support />
      <CornerLogo />
      <AccountPageWrapper>
        <AccountSections />
      </AccountPageWrapper>
    </>
  );
};

export default AccountPage;
