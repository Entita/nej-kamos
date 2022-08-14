import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 80%;
  height: fit-content;
  align-self: center;
`;

export const SearchIconStyled = styled.div`
  display: flex;
  position: absolute;
  right: 3px;
  cursor: pointer;
`;

export const SearchStyled = styled.input<any>`
  border: none;
  border-radius: ${({focused}) => focused ? '4px 4px 0 0' : '4px'};
  padding: 6px 9px;
  width: 100%;
  transition: border-radius 0.4s ease;
`;

export const SearchedProductsWrapperStyled = styled.div<any>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  z-index: 1;
  clip-path: ${({ open }) => open ? 'inset(0% 0% 0%)' : 'inset(0% 0% 100%)'};
  transition: clip-path 0.4s ease;
  border: 1px solid ${Color.lightGrey};
  border-top: unset;
  border-radius: 0 0 4px 4px;
`;

export const SearchedProductStyled = styled.div`
  display: grid;
  grid-template-columns: 2rem calc(100% - 2rem - 5rem - 12px) 5rem;
  grid-template-rows: 100%;
  gap: 6px;
  align-items: center;
  padding: 4px 8px;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const SearchedProductImageStyled = styled.div<any>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 2rem;
  height: 2rem;
  filter: contrast(1.1) saturate(1.75);
`;

export const SearchedProductNameStyled = styled.span``;

export const SearchedProductPriceStyled = styled.span`
  margin-left: auto;
  font-weight: bold;
`;

const SeachedSectionsStyled = styled.div`
  text-align: left;
  padding-left: 4px;
  padding-right: 4px;

  & > div {
    padding-left: 8px;
  }
`;

const SeachedSectionsTitleStyled = styled.span`
  font-weight: bold;
`;

const SearchedEachCategoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const SearchedProductsStyled = styled(SeachedSectionsStyled)``;
export const SearchedProductsTitleStyled = styled(SeachedSectionsTitleStyled)``;
export const SearchedCategoryStyled = styled(SearchedEachCategoryStyled)``;
export const SearchedCategoriesStyled = styled(SeachedSectionsStyled)``;
export const SearchedCategoriesTitleStyled = styled(SeachedSectionsTitleStyled)``;
export const SearchedSubcategoryStyled = styled(SearchedEachCategoryStyled)`
  flex-direction: row;
`;
export const SearchedSubcategoriesStyled = styled(SeachedSectionsStyled)``;
export const SearchedSubcategoriesTitleStyled = styled(SeachedSectionsTitleStyled)``;
export const SearchedCategoryOfSubcategory = styled.span`
  opacity: .6;
`;
