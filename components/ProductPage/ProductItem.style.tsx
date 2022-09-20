import styled from "styled-components";
import { Color } from "../../utils/colors";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 4rem;
`;

export const ProductWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  column-gap: 2rem;
  z-index: 1;
`;

export const ProductImageWrapperStyled = styled.div`
  position: relative;
  min-height: 350px;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
  border-radius: 11px;
  background-color: white;
  padding: 8px;
`;

export const ProductImageStyled = styled.div<{ imageUrl: String }>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  filter: contrast(1.1) saturate(1.75);
  height: 100%;
`;

export const ProductFavoriteStyled = styled.div`
  position: absolute;
  display: flex;
  top: .6rem;
  right: .6rem;
  cursor: pointer;

  & > svg {
    font-size: 48px;
  }

  &:hover {
    filter: opacity(.5);
  }
`;

export const ProductInfoWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: .6rem;
`;

export const ProductNameStyled = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
`;

export const ProductDescriptionStyled = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
`;

export const ProductAlternativeContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 4px;
`;

export const ProductAlternativeTitleStyled = styled.span`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 12px;
`;

export const ProductAlternativeWrapperStyled = styled.div`
  display: flex;
  gap: .6rem;
  justify-content: space-between;
`;

export const ProductAlternativeButtonWrapperStyled = styled.div`
  display: flex;
  gap: .3rem;
`;

export const ProductAlternativeButtonStyled = styled.button`
  background-color: ${Color.mainYellow};
  border-radius: 7px;
  border: unset;
  padding: 8px 32px;
  color: white;

  &:hover {
    filter: opacity(.5);
  }
`;

export const ProductStockWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ProductStockStyled = styled.span<{ stock: Number }>`
  color: ${({ stock }) => stock > 0 ? Color.lightGreen : Color.lightRed };
`;

export const ProductStockNumberStyled = styled.span``;

export const ProductDiscountWrapperStyled = styled.div`
  display: flex;
  gap: .6rem;
`;

export const ProductDiscountStyled = styled.span`
  background-color: ${Color.lightRed};
  border-radius: 7px;
  padding: 8px 16px;
  color: white;
`;

export const ProductFullPriceStyled = styled.span`
  position: relative;
  height: fit-content;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 12px;

  &::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${Color.mainYellow};
  }
`;

export const ProductPriceWrapperStyled = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
`;

export const ProductPriceStyled = styled.span`
  font-family: 'Inter';
  font-weight: 800;
  font-size: 32px;
`;

export const ProductPriceTextStyled = styled.span`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 12px;
  padding-bottom: 4px;
  color: ${Color.darkGray};
`;

export const ProductBasketWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProductReviewWrapperStyled = styled.div``;

export const ProductReviewStyled = styled.div`
  display: flex;

  & > svg {
    display: flex;
    color: ${Color.mainYellow};
    font-size: 36px;
  }
`;

export const ProductReviewTextStyled = styled.div`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  color: ${Color.darkGray};
  text-align: right;
`;

export const ProductSupportWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: 4rem 50% calc(50% - 4rem);
  background-color: ${Color.yellow};
  border-radius: 4px;
  padding: 1.6rem;
  color: white;

  & > svg {
    color: white;
    font-size: 38px;
    align-self: center;
  }
`;

export const ProductSupportInfoWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductSupportTitleStyled = styled.span`
  font-family: 'Inter';
  font-weight: 800;
  font-size: 12px;
`;

export const ProductSupportDescriptionStyled = styled.span`
  font-family: 'Inter';
  font-weight: 300;
  font-size: 11px;
`;

export const ProductSupportPhoneStyled = styled.span`
  font-family: 'Inter';
  font-weight: 900;
  font-size: 16px;
  margin-top: 6px;
`;

export const ProductSupportTimeStyled = styled.span`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 12px;
  align-self: flex-end;
  text-align: right;
`;

export const SectionTitleWrapperStyled = styled.div`
  display: flex;
  gap: 3rem;
`;

export const SectionTitleStyled = styled.span<{ selected: Boolean }>`
  font-family: 'Inter';
  font-style: normal;
  font-weight: ${({ selected }) => selected ? 800 : 200};
  font-size: 32px;
  cursor: pointer;

  &:hover {
    filter: opacity(.5);
  }
`;

export const SectionWrapperStyled = styled.div``;
