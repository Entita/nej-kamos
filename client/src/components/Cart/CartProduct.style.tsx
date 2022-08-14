import styled from 'styled-components';

export const WrapperStyled = styled.div`
  display: flex;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background-color: #f9f9f9;
  padding: 4px 8px;
  gap: 6px;
`;

export const ProductImageStyled = styled.div<any>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  filter: contrast(1.1) saturate(1.75);
  width: 2.4rem;
`;

export const ProductInfoStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

export const ProductInfoTopStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProductInfoBottomStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProductQuantityStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-left: 8px;
`;

export const ProductNameStyled = styled.span`
  cursor: pointer;
`;

export const ProductRemoveStyled = styled.span``;
export const ProductPriceStyled = styled.span`
  place-self: self-end;
`;
