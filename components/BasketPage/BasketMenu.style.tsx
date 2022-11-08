import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div``;

export const MenuWrapperStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  column-gap: 12px;

  &::before {
    position: absolute;
    content: '';
    left: 0;
    right: 1px;
    top: 8px;
    height: 4px;
    background-color: ${Color.yellow};
  }
`;

export const MenuItemDotStyled = styled.div<{ selected: Boolean }>`
  position: relative;
  box-shadow: ${({ selected }) =>
    selected
      ? `
      inset 0 0 0 2px ${Color.yellow},
      inset 0 0 0 5px white,
      inset 0 0 0 10px ${Color.mainYellow}
    `
      : `
      inset 0 0 0 2px ${Color.yellow},
      inset 0 0 0 10px white
    `};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
`;

export const MenuItemWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:nth-child(1) {
    place-items: self-start;
  }

  &:nth-last-child(1) {
    place-items: self-end;
  }
`;

export const MenuItemTitleStyled = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${Color.yellow};
  cursor: pointer;
`;

export const MenuComponentWrapperStyled = styled.div`
  
`;
