import styled, { css } from 'styled-components';
import { Color } from '../../../utils/colors';

export const ProductButtonStyled = styled.button<any>`
  position: relative;
  background-color: ${Color.lightRed};
  color: white;
  font-family: 'Tall Thin';
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  width: 80px;
  height: 30px;
  white-space: nowrap;
  place-self: flex-end;
  filter: ${({ disabled }) => disabled && 'saturate(0.5);'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const ProductError = styled.div`
  position: absolute;
  bottom: 35px;
  left: 50%;
  z-index: 10;
  min-width: 150px;
  padding: 10px;
  background: ${Color.lightRed};
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 51%) 1px 2px 4px 0px;
  transform: translate3d(-50%, 0px, 10px);

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: 0px;
    height: 0px;
    border-color: ${Color.lightRed} transparent transparent;
    border-style: solid;
    border-width: 8px 8px 0px;
    transform: translate3d(-50%, 0px, 10px);
  }
`;

export const ProductQuantityWrapper = styled.div<any>`
  display: flex;
  position: relative;
  height: 100%;
  gap: 4px;
  align-items: flex-end;
  justify-content: space-between;

  ${({ disabled }) =>
    disabled &&
    css`
      & > *:not(${ProductError}) {
        filter: saturate(0.5);
        cursor: not-allowed !important;
      }
    `}
`;

export const ProductQuantityPlus = styled.div`
  display: flex;
  cursor: pointer;
  color: ${Color.lightGreen};
`;

export const ProductQuantityMinus = styled(ProductQuantityPlus)`
  color: ${Color.lightRed};
`;

export const ProductQuantityStyled = styled.input`
  text-align: center;
  width: 18px;
  height: 20px;
  border: none;
  border-bottom: 1px solid black;
  background-color: inherit;
`;

export const ProductErrorText = styled.p`
  color: rgb(255, 255, 255);
  font-size: 11px;
  margin: 0px;
  line-height: 1.4;
`;

export const ProductErrorCancel = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  padding: 0px;
  background: ${Color.lightRed};
  border: 2px solid rgb(255, 255, 255);
  border-radius: 8px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 8px;
    background: rgb(255, 255, 255);
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 8px;
    background: rgb(255, 255, 255);
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
