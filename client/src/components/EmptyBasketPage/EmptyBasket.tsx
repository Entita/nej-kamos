import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonStyled, DescriptionStyled, TitleStyled, WrapperStyled } from './EmptyBasket.style';

export default function EmptyBasket() {
  const navigate = useNavigate();

  return (
    <WrapperStyled>
      <TitleStyled>Your basket is empty!</TitleStyled>
      <DescriptionStyled>Come after you add some products.</DescriptionStyled>
      <ButtonStyled onClick={() => navigate('/')}>Go home</ButtonStyled>
    </WrapperStyled>
  );
}
