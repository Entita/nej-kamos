import styled from "styled-components";
import { Color } from "../../utils/colors";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const ProductsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0;
  border-bottom: 1px solid ${Color.lightGray};
`;

export const BasketProductWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 500px;
`;

export const BasketProductImageStyled = styled.div<{ imageUrl: String }>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 2rem;
  height: 2rem;
  filter: contrast(1.1) saturate(1.75);
`;

export const BasketProductNameStyled = styled.span`
  
`;

export const BasketProductQuantityStyled = styled.span`
  
`;

export const BasketProductPriceStyled = styled.span`
  
`;

export const PriceWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PriceTitleStyled = styled.span`
  
`;

export const PriceAmountStyled = styled.span`
  
`;
