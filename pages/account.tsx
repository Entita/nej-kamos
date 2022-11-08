import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import Header from '../components/Header/Header';
import Support from '../components/Support/Support';
import Head from 'next/head';
import CornerLogo from '../components/ProductPage/CornerLogo';
import AccountSections from '../components/AccountSections/AccountSections';

export { getServerSideProps } from '../components/ServerSidePropsComponent';

const AccountPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 10rem);
  padding-top: 10rem;
  padding-bottom: 1rem;
  align-items: center;
`;

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
