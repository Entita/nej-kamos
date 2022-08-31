import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  bottom: 2rem;
  right: 2rem;
  width: 5.4rem;
  height: 3rem;
  border-radius: 14px;
  background-color: ${Color.mainRed};
  box-shadow: 3px 3px 7px -3px black;
  cursor: pointer;

  &:hover {
    filter: opacity(.5);
  }
`;

export const NotificationNumberWrapperStyled = styled.div`
  position: absolute;
  top: -.7rem;
  right: -.7rem;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background-color: ${Color.mainYellow};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NotificationNumberStyled = styled.span`
  color: ${Color.mainRed};
  font-weight: bold;
`;
