import type { NextPage } from 'next';
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

import agent from '../../utils/agent';
import { wrapper } from '../../redux/store';
import { refreshBasket, selectBasket } from '../../redux/basket';
import { refreshAccount } from '../../redux/account';
import { setCookie } from 'cookies-next';
import Header from '../../components/Header/Header';
import { refreshCategories } from '../../redux/categories';
import Search from '../../components/LandingPage/Search';
import Support from '../../components/Support/Support';
import Head from 'next/head';
import { refreshProducts, selectProducts } from '../../redux/products';
import { useRouter } from 'next/router';
import MenuSection from '../../components/ProductPage/MenuSection';
import CornerLogo from '../../components/ProductPage/CornerLogo';
import { useSelector } from 'react-redux';
import { addQuantityToProducts } from '../../utils/utils';
import { Product } from '../../models/client/Product';
import ProductItem from '../../components/ProductPage/ProductItem';

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 20% 2rem 20%;
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
  const router = useRouter();
  const productId = React.useMemo(
    () => router.query.id && router.query.id[0],
    [router],
  );
  const basket = useSelector(selectBasket);
  const products = useSelector(selectProducts);
  const product = React.useMemo(
    () =>
      addQuantityToProducts(
        basket.products,
        products.filter((product: Product) => product._id === productId),
      )[0],
    [productId, basket],
  );

  return (
    <>
      <Head>
        <title>{`Nej kámoš${product ? ` - ${product.name}` : ' - Produkt nenalezen'}`}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <Header modal={modal} setModal={setModal} />
      <CornerLogo />
      <LandingPageWrapper>
        <MenuSection />
        <Search />
        {product ? <ProductItem product={product} /> : <>Produkt nenalezen</>}
      </LandingPageWrapper>
      <Support />
    </>
  );
};

export default Home;
