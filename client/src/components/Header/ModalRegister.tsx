import React from 'react'
import { CheckboxWrapperStyled, InputStyled, LabelStyled, WrapperStyled } from './ModalRegister.style';

interface Props {
  registerUsername: string;
  registerPassword: string;
  registerEmail: string;
  registerNews: boolean;
  registerMarketing: boolean;
  setRegisterUsername: Function;
  setRegisterPassword: Function;
  setRegisterEmail: Function;
  setRegisterNews: Function;
  setRegisterMarketing: Function;
}

export default function ModalRegister({
  registerUsername,
  registerPassword,
  registerEmail,
  registerNews,
  registerMarketing,
  setRegisterUsername,
  setRegisterPassword,
  setRegisterEmail,
  setRegisterNews,
  setRegisterMarketing,
}: Props) {

  return (
    <WrapperStyled>
      <InputStyled placeholder='Přezdívka' value={registerUsername} onChange={({ target }) => setRegisterUsername(target.value)} />
      <InputStyled type='password' placeholder='Heslo' value={registerPassword}  onChange={({ target }) => setRegisterPassword(target.value)} />
      <InputStyled placeholder='Email' value={registerEmail} onChange={({ target }) => setRegisterEmail(target.value)} />
      <CheckboxWrapperStyled>
        <LabelStyled htmlFor='news'>Dostávat novinky:</LabelStyled>
        <InputStyled id='news' type='checkbox' checked={registerNews} onChange={() => setRegisterNews(!registerNews)} />
      </CheckboxWrapperStyled>
      <CheckboxWrapperStyled>
        <LabelStyled htmlFor='marketing'>Dostávat nabídky:</LabelStyled>
        <InputStyled id='marketing' type='checkbox' checked={registerMarketing} onChange={() => setRegisterMarketing(!registerMarketing)} />
      </CheckboxWrapperStyled>
    </WrapperStyled>
  )
}
