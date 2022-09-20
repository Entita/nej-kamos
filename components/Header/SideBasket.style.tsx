import styled from "styled-components";
import { Color } from "../../utils/colors";

export const WrapperStyled = styled.div<{ show: Boolean }>`
  position: fixed;
  right: ${({ show }) => show ? '0' : 'min(-20%, -350px)'};
  top: 50%;
  transform: translateY(-50%);
  height: max(70%, 400px);
  width: max(20%, 350px);
  border-radius: 11px 0 0 11px;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.15);
  background-color: white;
  z-index: 10;
  display: grid;
  grid-template-rows: 4rem calc(100% - 11rem) 7rem;
  flex-direction: column;
  transition: right .4s ease;
`;

export const BasketHeaderStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Color.mainYellow};
  margin-top: -1px;
  border-top-left-radius: 11px;
  padding: 6px 12px;
`;

export const BasketTitleStyled = styled.h1`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 21px;
`;

export const BasketCloseStyled = styled.div`
  position: absolute;
  display: flex;
  top: 4px;
  right: 8px;
  cursor: pointer;

  &:hover {
    filter: opacity(.5);
  }
`;

export const BasketBodyStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 12px;
  overflow-y: auto;
`;

export const BasketFooterStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 6px 2rem;
`;

export const BasketFooterHorizontalStyled = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Raleway';
  font-style: normal;
`;

export const BasketPriceTitleStyled = styled.span``;

export const BasketPriceStyled = styled.span`
  font-weight: bold;
`;

export const BasketButtonStyled = styled.button`
  padding: 12px 16px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: unset;
  border-radius: 8px;
  gap: 8px;
  background-color: ${Color.mainYellow};
  color: white;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 17px;

  & > svg {
   margin-bottom: 5px;
  }

  &:hover {
    filter: opacity(.5);
  }
`;

export const ProductQuantityStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const BasketProductStyled = styled.div`
  position: relative;
  display: grid;
  border-bottom: 1px solid black;
  padding: 4px 0;
  padding-right: 18px;
  column-gap: 8px;
  grid-template-columns: 2.4rem calc(100% - 7.65rem - 16px) 5.25rem;

  ${ProductQuantityStyled} {
    grid-column: 2;
  }
`;

export const ProductImageStyled = styled.div<{ imageUrl: String }>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: contrast(1.1) saturate(1.75);
  width: 2.4rem;
  height: 3.6rem;
  cursor: pointer;

  &:hover {
    opacity: .5;
  }
`;

export const BasketProductNameStyled = styled.span`
  color: black;
  align-self: center;
  width: fit-content;
  cursor: pointer;

  &:hover {
    filter: opacity(.5);
  }
`;

export const BasketProductPriceStyled = styled.span`
  text-align: right;
  font-weight: bold;
  align-self: center;
`;
