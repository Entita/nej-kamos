import styled, { css } from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  min-height: calc(100vh - 5rem);
  padding: 6px 12px;
  flex-wrap: wrap;
`;

export const LeftSideStyled = styled.div`
  width: 45vw;
  aspect-ratio: 1/1;
`;

export const ProductImageStyled = styled.div<any>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  filter: contrast(1.1) saturate(1.75);
  width: 100%;
  height: 100%;
`;

export const RightSideStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Gurajada';
  width: 80vh;
  aspect-ratio: 1/1;
`;

export const ProductTopStyled = styled.div`
  display: flex;
  border-bottom: 1px solid lightgrey;
  height: fit-content;
  width: 100%;
`;

export const ProductBottomStyled = styled.div<any>`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  height: calc(100% - 80px);
  width: 100%;
  gap: 1.8rem;
`;

export const ProductPriceBlockStyled = styled.div`
  display: flex;
  gap: 12px;
  place-self: start;
`;

export const ProductNameStyled = styled.span`
  font-size: 80px;
  line-height: 80px;
  color: ${Color.lightGrey};
`;

export const ProductPriceStyled = styled.span<any>`
  position: relative;
  font-size: 64px;
  line-height: 64px;
  color: ${({ discount }) => (discount ? Color.lightRed : Color.lightGreen)};

  ${({ discount }) =>
    discount &&
    css`
      &::before {
        content: '';
        width: 100%;
        position: absolute;
        right: 0;
        top: calc(50% - 1.5px);
        border-bottom: 3px solid ${Color.lightRed};
      }
    `}
`;

export const ProductDiscountStyled = styled.span`
  font-size: 64px;
  line-height: 64px;
  color: ${Color.lightGreen};
`;

export const ProductQuantityBlockStyled = styled.div`
  display: flex;
  align-items: center;
  color: ${Color.lighterGrey};
  font-size: 26px;
  line-height: 26px;
`;

export const ProductStockStyled = styled.span`
  color: ${Color.lightBlue};
`;

export const ProductButtonStyled = styled.button`
  border: none;
  color: white;
  background-color: ${Color.lightRed};
  padding: 6px 14px;
  font-family: 'Thin Tall';
  font-size: 22px;
  width: fit-content;
  border-radius: 6px;
  transition: filter .2s ease;
  filter: ${({ disabled }) => disabled && 'saturate(0.5);'};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};

  & > div {
    position: absolute;
    backdrop-filter: blur(0.8);
    top: calc(50% - 10px);
    left: calc(50% - 10px);
  }

  &:hover {
    filter: ${({ disabled }) => !disabled && 'brightness(.8)'};
  }
`;

export const ProductDescriptionBlockStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductDescriptionTitleStyled = styled.span`
  font-size: 38px;
  line-height: 38px;
  color: ${Color.lightGrey};
  font-weight: bold;
`;

export const ProductDescriptionStyled = styled.span`
  font-size: 21px;
  line-height: 21px;
  color: ${Color.lighterGrey};
  padding-left: 12px;
  text-align: justify;
`;
