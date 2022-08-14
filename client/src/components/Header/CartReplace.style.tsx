import styled from "styled-components";
import { Color } from "../../utils/colors";

export const WrapperStyled = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: brightness(.75) blur(2px);
  z-index: 11;
`;

export const ContainerStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 12px;
  background-color: white;
  padding: calc(20px) 1.2rem .8rem 1.2rem;
  justify-content: space-between;
`;

export const CancelButtonStyled = styled.div`
  position: absolute;
  display: flex;
  top: .4rem;
  right: .6rem;
  cursor: pointer;

  & > svg {
    width: 20px;
    height: 20px;
  }
`;

export const CartReplaceProductStyled = styled.div`
  display: grid;
  grid-template-columns: 2rem calc(100% - 8rem - 18px) 1rem 5rem;
  grid-template-rows: 100%;
  gap: 6px;
  align-items: center;
  padding: 4px 8px;
  text-align: left;
  align-items: flex-start;
`;

export const CartReplaceProductImageStyled = styled.div<any>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 2rem;
  height: 2rem;
  filter: contrast(1.1) saturate(1.75);
`;

export const CartReplaceProductNameStyled = styled.span``;
export const CartReplaceProductQuantityStyled = styled.span``;

export const CartReplaceProductPriceStyled = styled.span`
  text-align: right;
  font-weight: bold;
`;


export const CartReplaceBasketStyled = styled.div`
  max-height: 35vh;
  overflow-y: auto;
`;

export const CartReplaceBasketTitleStyled = styled.span`
  font-size: 32px;
  text-decoration: underline;
`;

export const CartReplaceBasketWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    padding-right: 1rem;
    border-right: 1px solid ${Color.lighterGrey};
  }
  &:nth-child(2) {
    padding-left: 1rem;

    & > * {
      margin-left: 1px;
    }
  }
`;

export const CartReplaceBasketsContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
  border-top: 1px solid ${Color.lighterGrey};
`;

export const CartReplaceBasketPriceContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  border-top: 1px solid ${Color.lighterGrey};
`;

export const CartReplaceBasketPriceTitleStyled = styled.span`
  font-size: 24px;
`;

export const CartReplaceBasketPriceAmountStyled = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

export const CartReplaceBasketButtonStyled = styled.button`
  margin-top: 1rem;
  border: unset;
  background-color: ${Color.lightGreen};
  border-radius: 8px;
  height: 2rem;
  color: whitesmoke;
  font-size: 21px;
  letter-spacing: 4px;
  cursor: pointer;
  transition: filter .4s ease;

  &:hover {
    filter: opacity(.8);
  }
`;

export const CartReplaceBasketsTitleStyled = styled.span`
  font-size: 23px;
`;
