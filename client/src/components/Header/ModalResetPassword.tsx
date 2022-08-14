import React from 'react';
import { InputStyled, WrapperStyled } from './ModalLogin.style';

interface Props {
  resetPassword: string;
  setResetPassword: Function;
}

export default function ModalResetPassword({
  resetPassword,
  setResetPassword,
}: Props) {
  return (
    <WrapperStyled>
      <InputStyled placeholder='Email' value={resetPassword} onChange={({ target }) => setResetPassword(target.value)} />
    </WrapperStyled>
  );
}
