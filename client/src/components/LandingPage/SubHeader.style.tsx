import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div<{ hidden: Boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0 10vw;
  margin-bottom: 1rem;
  width: 100%;
  justify-content: space-around;
  padding-bottom: 8px;
  border-bottom: ${({ hidden }) => hidden ? 'unset' : `1px solid ${Color.lighterGrey}`};
`;

const SubHeaderStyled = styled.span<any>`
  cursor: pointer;
  text-decoration: underline;
`;

export const SubcategoryStyled = styled(SubHeaderStyled)`
  font-size: 16px;
  color: ${({ selected }) => selected ? Color.subcategory : Color.lightGrey};
`;

export const CategoryStyled = styled(SubHeaderStyled)`
  font-size: 24px;
  font-weight: bold;
  color: ${({ selected }) => selected ? Color.category : Color.lightGrey};

  &:hover {
    color: ${Color.category};
  }
`;

export const CategoryWrapperStyled = styled.div``;

export const SubcategoryWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 2px;
  column-gap: 1rem;
  padding-left: 12px;
`;