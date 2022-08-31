import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  padding: 6px 0;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 10%);
  }
`;

export const CategoryStyled = styled.a`
  color: black;
  text-decoration: unset;

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
