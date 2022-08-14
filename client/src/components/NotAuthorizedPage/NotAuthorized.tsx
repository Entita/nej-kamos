import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonStyled, DescriptionStyled, RedStyled, TitleStyled, WrapperStyled } from './NotAuthorized.style';

export default function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <WrapperStyled>
      <TitleStyled>You are not</TitleStyled>
      <RedStyled>Authorized!</RedStyled>
      <DescriptionStyled>You don't have access to view this page.</DescriptionStyled>
      <ButtonStyled onClick={() => navigate('/')}>Go home</ButtonStyled>
    </WrapperStyled>
  );
}
