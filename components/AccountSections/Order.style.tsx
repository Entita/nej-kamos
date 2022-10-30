import styled, { css } from "styled-components";
import { Color } from "../../utils/colors";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Color.lightGray};
  border-radius: 6px;
`;

export const FieldWrapper = styled.div<{ open: Boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: ${({ open }) => open ? '6px 6px 0 0' : '6px'};
  transition: background-color .25s ease;
  cursor: pointer;

  &:hover {
    background-color: ${Color.gray};
  }
`;

export const FieldTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const FieldDesc = styled.span`
  letter-spacing: 1px;
  color: ${Color.darkGray};
`;

export const ExpandButtonStyled = styled.div<{ open: Boolean, angle: Number }>`
  position: absolute;
  display: flex;
  right: 4px;
  cursor: pointer;

  & > svg {
    rotate: ${({ angle }) => `${angle}deg`};
    transition: rotate .25s ease-out;
    font-size: 24px;
    color: ${Color.mainYellow};
  }
`;

export const DropdownStyled = styled.div<{ open: Boolean }>`
  max-height: 0;
  border-top: unset;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  ${({ open }) => open && css`
    border-top: 1px solid ${Color.gray};
    max-height: 500px;
    padding: 6px 8px;
  `}
`;

export const TransactionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TransactionTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

export const TransactionInput = styled.input`
  color: ${Color.darkGray};
  font-size: 16px;
  background-color: ${Color.gray};
  border-radius: 6px;
  border: unset;
  padding: 2px 4px;
  width: 50%;
`;

export const BasketWrapper = styled.div`
  border: 1px solid ${Color.darkGray};
  border-radius: 6px;
`;

export const BasketFieldWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 6px;

  &:nth-last-child(1) {
    flex-direction: column;
    align-items: baseline;
  }
`;

export const BasketFieldTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

export const BasketFieldDesc = styled.span`
  letter-spacing: 1px;
  font-size: 14px;
  color: ${Color.darkGray};
`;

export const BasketFieldDiscount = styled.div`
  position: absolute;
  right: 50%;
  display: flex;
  gap: 6px;
`;

export const BasketFieldDiscountText = styled.span`
  font-size: 13px;
  font-style: italic;
`;

export const BasketProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const BasketPriceWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid ${Color.gray};
  padding-top: 2px;
`;

export const BasketPriceTitleStyled = styled.span`
  font-weight: bold;
`;

export const BasketPriceAmountStyled = styled.span`
  
`;
