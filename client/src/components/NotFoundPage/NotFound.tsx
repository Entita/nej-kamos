import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonStyled, DescriptionStyled, RedStyled, TitleStyled, WrapperStyled } from './NotFound.style';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <WrapperStyled>
      <TitleStyled><RedStyled>Oops!</RedStyled> Page not found</TitleStyled>
      <DescriptionStyled>The page you're looking for doesn't exist.</DescriptionStyled>
      <ButtonStyled onClick={() => navigate('/')}>Go home</ButtonStyled>
    </WrapperStyled>
  );
}
