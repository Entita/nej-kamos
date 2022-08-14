import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: calc(100vh - 5rem);
  gap: 12px;
`;

export const TitleStyled = styled.span`
  font-size: 48px;
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

export const DescriptionStyled = styled.span`
  color: slategray;
  font-size: 19px;
`;

export const ButtonStyled = styled.button`
  border: none;
  border-radius: 6px;
  background-color: ${Color.lightGreen};
  color: whitesmoke;
  font-size: 21px;
  padding: 8px 12px;
  transition: filter .2s ease;

  &:hover {
    filter: brightness(.8)
  }
`;
