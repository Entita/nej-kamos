import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  ButtonStyled,
  CancelButtonStyled,
  ChangeTypeButtonStyled,
  ContainerStyled,
  ControlStyled,
  TitleStyled,
  WrapperStyled,
} from './AccountModal.style';
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import { asyncCreateAccount, asyncLoginAccount } from '../../redux/account';
import { useDispatch } from 'react-redux';
import CartReplace from './CartReplace';
import { Basket } from '../../models/Basket';
import agent from '../../api/agent';
import ModalResetPassword from './ModalResetPassword';
import { isEmailInUse, isEmailValid, isPasswordValid, isUsernameInUse, isUsernameValid } from '../../utils/validators';

interface Props {
  setShowAccountModal: Function;
}

export default function AccountModal({ setShowAccountModal }: Props) {
  const [cartReplaceData, setCartReplaceData] = React.useState<{ accountId: string, accountBasket: Basket, cookieBasket: Basket } | null>();
  const [loginUsername, setLoginUsername] = React.useState<string>('');
  const [loginPassword, setLoginPassword] = React.useState<string>('');

  const [registerUsername, setRegisterUsername] = React.useState<string>('');
  const [registerPassword, setRegisterPassword] = React.useState<string>('');
  const [registerEmail, setRegisterEmail] = React.useState<string>('');
  const [registerNews, setRegisterNews] = React.useState<boolean>(false);
  const [registerMarketing, setRegisterMarketing] = React.useState<boolean>(false);

  const [resetPassword, setResetPassword] = React.useState<string>('');

  const [type, setType] = React.useState<string>('login');
  const dispatch = useDispatch();
  const bgRef = React.useRef(null);

  // Validations
  const login = async () => {
    if (loginUsername.length === 0 || loginPassword.length === 0) return;
    await asyncLoginAccount(dispatch, { username: loginUsername, password: loginPassword })
      .then((data: any) => {
        if (data) setCartReplaceData(data);
        else setShowAccountModal(false)
      });
  }

  const register = async () => {
    if (isUsernameValid(registerUsername) && isEmailValid(registerEmail) && isPasswordValid(registerPassword) &&
      await isUsernameInUse(registerUsername) && await isEmailInUse(registerEmail)) return;

    await asyncCreateAccount(dispatch, {
      username: registerUsername,
      password: registerPassword,
      email: registerEmail,
      notifications: {
        news: registerNews,
        marketing: registerMarketing
      }
    })
  }

  const resetPass = async () => {
    if (resetPassword.length === 0) return;

    await agent.Account.resetPassword({ email: resetPassword })
      .then((data) => !data.failed && setType('login'));
  }

  if (cartReplaceData)
    return (
      <CartReplace
        setCartReplaceData={setCartReplaceData}
        accountId={cartReplaceData.accountId}
        accountBasket={cartReplaceData.accountBasket}
        cookieBasket={cartReplaceData.cookieBasket}
      />
    )

  return (
    <WrapperStyled ref={bgRef} onClick={({ target }) => target === bgRef.current && setShowAccountModal(false)}>
      <ContainerStyled>
        <CancelButtonStyled onClick={() => setShowAccountModal(false)}>
          <CloseRoundedIcon color='error' />
        </CancelButtonStyled>
          <TitleStyled>{type === 'login' ? 'Přihlášení' : (type === 'reset_password' ? 'Zapomenuté heslo' : 'Registrace')}</TitleStyled>
          {type === 'login'
            ? <ModalLogin
                loginUsername={loginUsername}
                loginPassword={loginPassword}
                setLoginUsername={setLoginUsername}
                setLoginPassword={setLoginPassword}
              />
            : (type === 'reset_password'
              ? <ModalResetPassword 
                  resetPassword={resetPassword}
                  setResetPassword={setResetPassword}
                />
              : <ModalRegister
                  registerUsername={registerUsername}
                  registerPassword={registerPassword}
                  registerEmail={registerEmail}
                  registerNews={registerNews}
                  registerMarketing={registerMarketing}
                  setRegisterUsername={setRegisterUsername}
                  setRegisterPassword={setRegisterPassword}
                  setRegisterEmail={setRegisterEmail}
                  setRegisterNews={setRegisterNews}
                  setRegisterMarketing={setRegisterMarketing}
                />)}
          <ControlStyled>
            {type === 'login'
              ? <>
                  <ChangeTypeButtonStyled onClick={() => setType('reset_password')}>Zapomněl si heslo?</ChangeTypeButtonStyled>
                  <ChangeTypeButtonStyled onClick={() => setType('register')}>Ještě nemáš účet?</ChangeTypeButtonStyled>
                </>
              : (
              type === 'reset_password' 
                ? <ChangeTypeButtonStyled onClick={() => setType('login')}>Zpět na přihlášení</ChangeTypeButtonStyled>
                : <ChangeTypeButtonStyled onClick={() => setType('login')}>Už máš účet?</ChangeTypeButtonStyled>)}
            {type === 'login'
              ? <ButtonStyled onClick={() => login()}>Login</ButtonStyled>
              : (
              type === 'reset_password'
                ? <ButtonStyled onClick={() => resetPass()}>Obnovit heslo</ButtonStyled>
                : <ButtonStyled onClick={() => register()}>Register</ButtonStyled>)}
          </ControlStyled>
      </ContainerStyled>
    </WrapperStyled>
  );
}
