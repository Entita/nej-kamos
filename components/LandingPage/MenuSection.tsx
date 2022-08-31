import React from 'react'
import { useSelector } from 'react-redux'
import { selectCategories } from '../../redux/categories';
import { CategoryStyled, DiscountStyled, NewStyled, WrapperStyled } from './MenuSection.style'

export default function MenuSection() {
  const categories = useSelector(selectCategories);

  return (
    <WrapperStyled>
      {categories.map((category: string, index: number) =>
        <CategoryStyled key={index} href={`?category=${category}`}>{category}</CategoryStyled>
      )}
      <NewStyled href={'?category=new'}>novinky</NewStyled>
      <DiscountStyled href={'?category=discount'}>zlevněné zboží</DiscountStyled>
    </WrapperStyled>
  )
}
