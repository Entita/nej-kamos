import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const SearchInputStyled = styled.input`
  width: 50%;
  border: none;
  box-shadow: 0px 1px 8px rgba(0 0 0 / 10%);
  border-radius: 16px;
  padding: 18px 32px;
  padding-right: 64px;
`;

export const SearchButtonStyled = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  width: 64px;
  right: 25%;
  border-radius: 0 16px 16px 0;
  padding-left: 16px;
  cursor: pointer;

  &:hover {
    filter: opacity(.5);
    background-color: rgb(0 0 0 / 10%);
  }
`;
