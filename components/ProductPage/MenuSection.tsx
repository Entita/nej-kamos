import React from 'react'
import Router from 'next/router';
import { useSelector } from 'react-redux'
import { selectCategories } from '../../redux/categories';
import { CategoryStyled, DiscountStyled, NewStyled, WrapperStyled } from './MenuSection.style'

export default function MenuSection() {
  const categories = useSelector(selectCategories);

  return (
    <WrapperStyled>
      {categories.map((category: string, index: number) =>
        <CategoryStyled key={index} onClick={() => Router.push(`/?category=${category}`)}>{category}</CategoryStyled>
      )}
      <NewStyled onClick={() => Router.push(`/?category=new`)}>novinky</NewStyled>
      <DiscountStyled onClick={() => Router.push(`/?category=discount`)}>zlevněné zboží</DiscountStyled>
    </WrapperStyled>
  )
}
