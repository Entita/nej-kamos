import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div`
  display: flex;
  position: absolute;
  top: 1rem;
  right: 1rem;
  gap: 8px;
  z-index: 10;
`;

export const LoginButtonStyled = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-family: 'Raleway';
  font-weight: bold;
  font-size: 24px;
  background-color: white;
  color: ${Color.mainYellow};

  &:hover {
    filter: brightness(.95);
  }
`;

export const RegisterButtonStyled = styled(LoginButtonStyled)`
  background-color: ${Color.mainYellow};
  font-weight: 400;
  color: white;
`;

export const AccountButtonStyled = styled(RegisterButtonStyled)``;

export const LogoutButtonStyled = styled(LoginButtonStyled)``;

export const BasketWrapperStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    filter: brightness(.95);
  }
`;

export const BasketNumberWrapperStyled = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -12px;
  right: 0px;
  background-color: ${Color.mainRed};
  border-radius: 50%;
  width: 24px;
  height: 24px;
`;

export const BasketNumberStyled = styled.span`
  color: ${Color.mainYellow};
  font-family: 'Raleway';
  font-weight: bold;
  font-size: 20px;
`;
