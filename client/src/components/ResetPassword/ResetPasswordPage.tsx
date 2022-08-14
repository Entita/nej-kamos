import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from 'react-toastify';
import styled from 'styled-components';
import agent from '../../api/agent';
import { isPasswordValid } from '../../utils/validators';
import { ButtonStyled, ChangePasswordButtonStyled, PasswordInputStyled, PasswordWrapperStyled, TitleStyled, WrapperStyled } from './ResetPasswordPage.style';

const LoadingStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 5rem);

  & > div {
    width: 8rem;
    height: 8rem;
    border-width: 1rem;
  }
`;

export default function ResetPasswordPage() {
  const [password, setPassword] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);
  const [failed, setFailed] = React.useState<boolean>(false);
  const [changed, setChanged] = React.useState<boolean>(false);
  const query = new URLSearchParams(useLocation().search);
  const queryId = useLocation().pathname;
  const email = query.get('email');
  const resetId = queryId.split('/passwordReset/')[1];
  const navigate = useNavigate();

  React.useEffect(() => {
    agent.Account.resetPasswordVerify({ resetId })
      .then((data) => {
        if (data.failed) setFailed(true);
        setChanged(data.data);
        setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePassword = () => {
    if (isPasswordValid(password)) return;

    agent.Account.changePassword({ email, password, resetId })
      .then((data) => {
        if (data.failed) setFailed(true);
        else navigate('/');
    });
  }

  if (loading) return <LoadingStyled>{Icons.spinner()}</LoadingStyled>

  return (
    <WrapperStyled>
      <TitleStyled>{failed ? 'Error changing password' : (changed ? 'The password has already been changed' :
        <PasswordWrapperStyled>
          Změna hesla
          <PasswordInputStyled placeholder='Nové heslo' value={password} onChange={({ target }) => setPassword(target.value)} />
          <ChangePasswordButtonStyled onClick={changePassword}>Změnit heslo</ChangePasswordButtonStyled>
        </PasswordWrapperStyled>
      )}</TitleStyled>
      <ButtonStyled onClick={() => navigate('/')}>Go home</ButtonStyled>
    </WrapperStyled>
  );
}
