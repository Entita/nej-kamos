import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: calc(100vh - 5rem);
  gap: 12px;
  width: max(300px, 60%);
  margin: 0 auto;
`;

export const TitleStyled = styled.span`
  font-size: 48px;
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

export const DescriptionStyled = styled.span`
  width: max(250px,50%);
`;

export const DescriptionWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DescriptionLeftStyled = styled.span`
  font-size: 19px;
`;

export const DescriptionRightStyled = styled.span`
  font-weight: bold;
  font-size: 19px;
`;

export const ButtonStyled = styled.button`
  border: none;
  border-radius: 6px;
  background-color: ${Color.lightGreen};
  color: whitesmoke;
  font-size: 21px;
  padding: 8px 12px;
  transition: filter .2s ease;

  &:hover {
    filter: brightness(.8)
  }
`;

export const ModalProductsStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: auto;
  margin: 1rem 0;
  width: 100%;
`;

export const ModalProductStyled = styled.div`
  display: grid;
  grid-template-columns: 2rem calc(100% - 9rem - 18px) 2rem 5rem;
  grid-template-rows: 100%;
  gap: 6px;
  align-items: center;
  padding: 4px 0;
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

export const ModalDiscountRightStyled = styled.div`
  position: relative;
`;

export const ModalDiscountNameStyled = styled.span`
  color: ${Color.lighterGrey};
  margin-right: 2rem;
`;

export const ModalDiscountSpanStyled = styled.span``;
export const ModalDiscountButtonStyled = styled.button`
  padding: 0 8px;
`;

export const ModalPriceWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: 'Harmattan', sans-serif;
  font-size: 36px;
  line-height: 36px;
  margin: 8px 0;
  white-space: nowrap;
  border-top: 1px solid ${Color.lighterGrey};
  padding-top: .5rem;
`;

export const ModalTotalPriceStyled = styled.span``;
export const ModalPriceStyled = styled.span`
  letter-spacing: 2px;
  font-weight: bold;
`;

export const ModalDiscountLeftStyled = styled.div`
  display: flex;
  gap: .5rem;
`;

export const ModalDiscountWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const PaymentButtonStyled= styled.button`
  padding: 12px 24px;
  width: 150px;
  border-radius: 4px;
  letter-spacing: 1px;
  background-color: ${Color.lightGreen};
  border: 2px solid rgba(0,0,0, .5);
  color: rgba(0,0,0, .7);
  margin-top: 1rem;
  font-weight: bold;

  &:hover {
    filter: opacity(.8);
  }
`;
