import React from 'react';
import AddingSchema from './admin/AddingSchema';
import Categories from './SubHeader';
import {
  ProductsStyled,
  WrapperStyled,
} from './LandingPage.style';
import Products from './Products';
import { useSelector } from 'react-redux';

export default function LandingPage() {
  const account = useSelector((state: any) => state.account.account);
  
  return (
    <WrapperStyled>
      <Categories />
      <ProductsStyled>
        <Products />
        {account?.roles.includes('admin') && <AddingSchema />}
      </ProductsStyled>
    </WrapperStyled>
  );
}
