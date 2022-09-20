import styled, { css } from 'styled-components';
import { Color } from '../../utils/colors';
import { ProductError } from './ProductQuantityLandingPage.style';

export const ProductBasketStyled = styled.button<any>`
  padding: 8px 16px;
  border-radius: 8px;
  border: unset;
  background-color: ${Color.green};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  color: white;
  font-family: 'Raleway';
  font-weight: 700;
  font-size: 16px;
  filter: ${({ disabled }) => disabled && 'saturate(0.5);'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    filter: opacity(.5);
  }
`;

export const ProductPageQuantityWrapper = styled.div<any>`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 127px;
  gap: 4px;
  align-items: center;
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
