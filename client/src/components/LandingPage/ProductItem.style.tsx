import styled, { css } from 'styled-components';
import { Color } from '../../utils/colors';

export const ProductStyled = styled.div`
  padding: 8px;
  width: 16rem;
  background-color: white;
  border-radius: 6px;
`;

export const ProductBorderStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  height: 100%;
  justify-content: space-between;
`;

export const ProductImageStyled = styled.div<any>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 9rem;
  height: 10rem;
  margin-bottom: 4px;
  filter: contrast(1.1) saturate(1.75);
`;

export const ProductPriceBlockStyled = styled.div`
  display: flex;
  font-family: 'Harmattan';
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  place-self: start;
  gap: 6px;
`;

export const ProductPriceStyled = styled.span<any>`
  position: relative;
  color: ${({ discount }) => (discount ? Color.lightRed : Color.lightGreen)};

  ${({ discount }) =>
    discount &&
    css`
      &::before {
        content: '';
        width: 100%;
        position: absolute;
        right: 0;
        top: calc(50% - 3.5px);
        border-bottom: 2px solid ${Color.lightRed};
      }
    `}
`;

export const ProductDiscountStyled = styled.span`
  color: ${Color.lightGreen};
`;

export const ProductNameStyled = styled.span`
  font-family: 'Tall Thin';
  font-weight: bold;
  font-size: 22px;
  line-height: 22px;
  color: ${Color.lightGrey};
  cursor: pointer;

  &:hover {
    filter: opacity(0.8);
  }
`;

export const ProductBottomStyled = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
