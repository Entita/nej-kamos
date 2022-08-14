import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div`
  position: fixed;
  right: 0;
  top: 6rem;
  width: max(30vw, 400px);
  height: calc(100% - 6rem - 10%);
  background-color: white;
  border-radius: 12px 0 0 12px;
  transform: translateX(max(35vw, 400px));
  transition: transform 0.6s ease;
  padding: 8px 2.4rem 1.6rem 2.4rem;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 50px calc(100% - 50px - 100px) 100px;
  border: 2px solid ${Color.lighterGrey};
  border-right: unset;
  z-index: 9;

  &.open {
    transform: unset;
  }
`;

export const CartTopStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseButtonStyled = styled.div`
  position: absolute;
  top: 8px;
  right: -1.75rem;
  cursor: pointer;
`;

export const CartTitleStyled = styled.span`
  font-size: 50px;
  font-family: 'Harmattan', sans-serif;
`;

export const CartMiddleStyled = styled.div`
  border-top: 2px solid lightgray;
  border-bottom: 2px solid lightgray;
  overflow-y: auto;
`;

export const CartBottomStyled = styled.div`
  height: fit-content;
`;

export const CartPriceWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Harmattan', sans-serif;
  font-size: 48px;
  line-height: 48px;
  margin: 8px 0;
  white-space: nowrap;
`;

export const CartTotalPriceStyled = styled.span``;
export const CartPriceStyled = styled.span`
  letter-spacing: 2px;
  font-weight: bold;
`;

export const OrderButtonStyled = styled.button`
  background-color: ${Color.lightGreen};
  width: 100%;
  color: whitesmoke;
  border-radius: 6px;
  border: none;
  font-size: 26px;
  line-height: 24px;
  letter-spacing: 1px;
  padding: 6px 12px;
  font-family: 'Tall Thin';
  transition: filter .4s ease;

  &:hover {
    filter: brightness(.8);
  }
`;

export const CartProductsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
`;
