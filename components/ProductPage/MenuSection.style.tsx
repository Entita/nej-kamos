import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  padding: 6px 0;
`;

export const CategoryStyled = styled.a`
  color: black;
  cursor: pointer;

  &:hover {
    filter: opacity(.5); 
  }
`;

export const NewStyled = styled(CategoryStyled)`
  font-weight: bold;
`;

export const DiscountStyled = styled(CategoryStyled)`
  color: ${Color.mainRed};
  font-weight: bold;
`;
