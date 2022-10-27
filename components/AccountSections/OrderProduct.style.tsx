import styled from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProductImageStyled = styled.div<{ imageUrl: String }>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 2rem;
  height: 2rem;
  filter: contrast(1.1) saturate(1.75);
`;

export const ProductNameStyled = styled.span`
  
`;

export const ProductQuantityStyled = styled.span`
  
`;

export const ProductPriceStyled = styled.span`
  
`;
