import styled from "styled-components";
import { Color } from "../../utils/colors";

export const ModalTitleStyled = styled.span`
  font-size: 48px;
`;

export const ModalContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 100%;
  margin: 1rem 0;
  border-bottom: 1px solid ${Color.lighterGrey};
`;

export const ModalProductsStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  margin-top: auto;
  margin: 1rem 0;
`;

export const ModalProductStyled = styled.div`
  display: grid;
  grid-template-columns: 2rem calc(100% - 9rem - 18px) 2rem 5rem;
  grid-template-rows: 100%;
  gap: 6px;
  align-items: center;
  padding: 4px 8px;
  text-align: left;
  align-items: flex-start;
`;

export const ModalProductImageStyled = styled.div<any>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 2rem;
  height: 2rem;
  filter: contrast(1.1) saturate(1.75);
`;

export const ModalProductNameStyled = styled.span``;
export const ModalProductQuantityStyled = styled.span``;

export const ModalProductPriceStyled = styled.span`
  text-align: right;
  font-weight: bold;
`;

export const ModalButtonWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

export const ModalPriceWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Harmattan', sans-serif;
  font-size: 36px;
  line-height: 36px;
  margin: 8px 0;
  white-space: nowrap;
`;

export const ModalTotalPriceStyled = styled.span``;
export const ModalPriceStyled = styled.span`
  letter-spacing: 2px;
  font-weight: bold;
`;

export const ModalBasketEditStyled = styled.button`
  margin-left: auto;
  width: 100px;
  padding: 6px 12px;
  letter-spacing: 1px;
  border: unset;
  background-color: ${Color.lighterGrey};
  border-radius: 4px;
  color: whitesmoke;
  white-space: nowrap;
  transition: filter .2s ease;

  &:hover {
    filter: opacity(.8);
  }
`;

export const ModalDiscountWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalDiscountInputStyled = styled.input<{ error: Boolean }>`
  padding: 2px 5px;
  width: 92px;
  border: 1px solid ${({ error }) => error ? 'darkred' : 'black'};
  border-radius: 2px;
  letter-spacing: 2px;
  text-align: center;
`;

export const ModalDiscountLeftStyled = styled.div`
  display: flex;
  gap: .5rem;
`;

export const ModalDiscountRightStyled = styled.div`
  position: relative;
`;

export const ModalDiscountUnapplyStyled = styled.div`
  position: absolute;
  right: -22px;
  cursor: pointer;

  &:hover {
    filter: opacity(.5);
  }

  & > svg {
    font-size: 18px;
  }
`;

export const ModalDiscountNameStyled = styled.span`
  color: ${Color.lighterGrey};
  margin-right: 2rem;
`;

export const ModalDiscountSpanStyled = styled.span``;
export const ModalDiscountButtonStyled = styled.button`
  padding: 0 8px;
`;
