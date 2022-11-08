import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import { selectBasket } from '../../redux/basket';
import Header from '../../components/Header/Header';
import Search from '../../components/LandingPage/Search';
import Support from '../../components/Support/Support';
import Head from 'next/head';
import { selectProducts } from '../../redux/products';
import { useRouter } from 'next/router';
import MenuSection from '../../components/ProductPage/MenuSection';
import CornerLogo from '../../components/ProductPage/CornerLogo';
import { useSelector } from 'react-redux';
import { addQuantityToProducts } from '../../utils/utils';
import { Product } from '../../models/client/Product';
import ProductItem from '../../components/ProductPage/ProductItem';

export { getServerSideProps } from '../../components/ServerSidePropsComponent';

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 20% 2rem 20%;
`;

const ProductPage: NextPage = () => {
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
        <link rel="shortcut icon" href="../images/favicon.ico" />
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

export default ProductPage;
