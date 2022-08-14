import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icons } from 'react-toastify';
import styled from 'styled-components';
import { asyncVerifyAccount } from '../../redux/account';
import NotAuthorized from '../NotAuthorizedPage/NotAuthorized';
import { ButtonStyled, TitleStyled, WrapperStyled } from './VerificationPage.style';

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

export default function VerificationPage() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [failed, setFailed] = React.useState<boolean>(false);
  const account = useSelector((state: any) => state.account.account);
  const [verified] = React.useState<boolean>(account?.verified);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    asyncVerifyAccount(dispatch)
      .then((verified: any) => {
        if (!verified) setFailed(true);
        setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!account) return <NotAuthorized />
  if (loading) return <LoadingStyled>{Icons.spinner()}</LoadingStyled>

  return (
    <WrapperStyled>
      <TitleStyled>{failed ? 'Error verifying account' : (verified ? 'Account is already verified' : 'Account is now verified!')}</TitleStyled>
      <ButtonStyled onClick={() => navigate('/')}>Go home</ButtonStyled>
    </WrapperStyled>
  );
}
