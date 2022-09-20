import styled from "styled-components";
import { Color } from "../../utils/colors";

export const ProductWrapperStyled = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 14rem;
  height: 20rem;
`;

export const ProductTopWrapperStyled = styled.div`
  width: 100%;
  height: 70%;
  background-color: white;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
  border-radius: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProductBottomWrapperStyled = styled.div`
  margin-top: -20%;
  width: 80%;
  min-height: 45%;
  background-color: white;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 1rem;
  border-radius: 8px;
  z-index: 1;
`;

export const ProductFavoriteStyled = styled.div`
  display: flex;
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;

  & > svg {
    font-size: 32px;
  }

  &:hover {
    filter: opacity(.5);
  }
`;

export const ProductImageStyled = styled.div<{ imageUrl: String }>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: contrast(1.1) saturate(1.75);
  width: 70%;
  height: 75%;
  cursor: pointer;

  &:hover {
    opacity: .5;
  }
`;

export const ProductNameStyled = styled.span`
  text-align: center;
  cursor: pointer;

  &:hover {
    opacity: .5;
  }
`;

export const ProductDiscountWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const ProductDiscountStyled = styled.span`
  font-weight: bold;
  text-align: center;
  color: ${Color.darkGray};
  position: relative;

  &:before {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: ${Color.mainRed};
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const ProductPriceStyled = styled.span`
  font-weight: bold;
  text-align: center;
`;

export const ProductStockWrapperStyled = styled.div`
  display: flex;
  gap: 6px;
`;

export const ProductStockNumberStyled = styled.span``;

export const ProductStockStyled = styled.span<{ stock: Number }>`
  color: ${({ stock }) => stock > 0 ? Color.lightGreen : Color.lightRed };
`;
