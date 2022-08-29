import type { NextPage } from 'next';
import axios from 'axios';
import React from 'react';

import agent from '../utils/agent';
import { wrapper } from '../redux/store';
import { refreshBasket} from '../redux/basket';
import { refreshAccount } from '../redux/account';
import { TestStyled } from '../styles/index.style';
import { setCookie } from 'cookies-next';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    axios.defaults.headers.common['precookie'] = JSON.stringify(context.req.cookies);
    const basket = await agent.Basket.get();
    const account = await agent.Account.get();
    delete axios.defaults.headers.common['precookie'];

    if (!basket.failed) {
      store.dispatch(refreshBasket(basket.data));
      store.dispatch(refreshAccount(account));
      if (basket) setCookie('basketId', basket.data._id, { req: context.req, res: context.res });
      if (account) setCookie('accountId', account._id, { req: context.req, res: context.res });
    };

    return {
      props: {
        basket: basket.data,
        account
      },
    };
  },
);

const Home: NextPage = ({ basket, account }: any) => {
  console.log(basket, account);

  return <TestStyled>home</TestStyled>;
};

export default Home;
