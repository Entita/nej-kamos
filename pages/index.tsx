import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import { selectAccount } from '../redux/account';
import Header from '../components/Header/Header';
import TopLogo from '../components/LandingPage/TopLogo';
import MenuSection from '../components/LandingPage/MenuSection';
import Search from '../components/LandingPage/Search';
import Support from '../components/Support/Support';
import Head from 'next/head';
import { filterProducts, selectProducts } from '../redux/products';
import ProductsSection from '../components/LandingPage/ProductsSection';
import { useSelector } from 'react-redux';
import { Product } from '../models/client/Product';
import Notification from '../components/Notification/Notification';
import { useRouter } from 'next/router';

export { getServerSideProps } from '../components/ServerSidePropsComponent';

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 10%;
`;

const Home: NextPage = () => {
  const { query } = useRouter();
  const [modal, setModal] = React.useState<'' | 'login' | 'register' | 'forgotten_password'>('');
  const [showNotification, setShowNotification] = React.useState<boolean>(false);
  const account = useSelector(selectAccount);
  const products = useSelector(selectProducts);
  const filteredProducts = filterProducts(products, query);

  const getFavoriteProducts = () => {
    if (!account) return [];

    return filteredProducts.filter((product: Product) => account.favorites.includes(product._id));
  };

  return (
    <>
      <Head>
        <title>Nej kámoš</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="images/favicon.ico" />
      </Head>

      {showNotification && <Notification setShow={setShowNotification} setModal={setModal} />}

      <Header modal={modal} setModal={setModal} />
      <TopLogo />
      <LandingPageWrapper>
        <MenuSection />
        <Search />
        <ProductsSection setShowNotification={setShowNotification} products={getFavoriteProducts()} section='Oblíbené' />
        <ProductsSection setShowNotification={setShowNotification} products={filteredProducts} section='Doporučené' />
      </LandingPageWrapper>
      <Support />
    </>
  );
};

export default Home;
