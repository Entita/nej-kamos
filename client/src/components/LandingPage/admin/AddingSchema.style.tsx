import styled from 'styled-components';
import { Color } from '../../../utils/colors';

export const AddStyled = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid lightgray;
  gap: 4px;
  width: 16rem;
  height: fit-content;
`;

export const ButtonWrapperStyled = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
  justify-content: center;
`;

export const AddButtonStyled = styled.div`
  transition: filter 0.2s ease;
  cursor: pointer;

  & > svg {
    font-size: 64px;
    color: ${Color.lightGreen};
  }

  &:hover {
    filter: brightness(0.8);
  }
`;

export const BackButtonStyled = styled.button`
  background-color: ${Color.lightRed};
  padding: 4px 6px;
  border-radius: 4px;
  border: none;
  color: whitesmoke;
  width: 60px;
`;

export const ConfirmButtonStyled = styled(BackButtonStyled)`
  background-color: ${Color.lightGreen};
  width: calc(100% - 60px - 6px);
`;
