import React from 'react';
import { InputStyled, WrapperStyled } from './ModalLogin.style';

interface Props {
  loginUsername: string;
  loginPassword: string;
  setLoginUsername: Function;
  setLoginPassword: Function;
}

export default function ModalLogin({
  loginUsername,
  loginPassword,
  setLoginUsername,
  setLoginPassword,
}: Props) {
  return (
    <WrapperStyled>
      <InputStyled placeholder='Přezdívka' value={loginUsername} onChange={({ target }) => setLoginUsername(target.value)} />
      <InputStyled type='password' placeholder='Heslo' value={loginPassword}  onChange={({ target }) => setLoginPassword(target.value)} />
    </WrapperStyled>
  );
}
