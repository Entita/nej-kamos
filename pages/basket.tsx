import type { NextPage } from 'next';
import React from 'react';

import Header from '../components/Header/Header';
import Support from '../components/Support/Support';
import Head from 'next/head';
import Notification from '../components/Notification/Notification';
import CornerLogo from '../components/ProductPage/CornerLogo';
import BasketMenu from '../components/BasketPage/BasketMenu';
import styled from 'styled-components';

export { getServerSideProps } from '../components/ServerSidePropsComponent';

const BasketPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 10rem);
  padding-top: 10rem;
  padding-bottom: 1rem;
  align-items: center;
`;

const BasketPage: NextPage = () => {
  const [modal, setModal] = React.useState<string>('');
  const [showNotification, setShowNotification] = React.useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Nej kámoš</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="../images/favicon.ico" />
      </Head>

      {showNotification && <Notification setShow={setShowNotification} setModal={setModal} />}

      <Header modal={modal} setModal={setModal} />
      <Support />
      <CornerLogo />
      <BasketPageWrapper>
        <BasketMenu />
      </BasketPageWrapper>
    </>
  );
};

export default BasketPage;
