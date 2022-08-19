import styled from 'styled-components';
import { Color } from '../../utils/colors';

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AccountTableStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  
  & > * {
    border: 1px solid ${Color.lighterGrey};
    padding: 10px;
  }

  & > *:nth-child(even) {
    border-left: unset;
  }

  & > *:not(:nth-child(1), :nth-child(2)) {
    border-top: unset;
  }
`;
export const AccountTitleStyled = styled.h1``;
export const AccountRoleStyled = styled.span``;
export const AccountTransactionStyled = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;
export const AccountLeftStyled = styled.span``;
export const AccountSelectStyled = styled.select`
  width: 100%;
`;
export const AccountOptionStyled = styled.option``;
export const AccountInputStyled = styled.input<{ readonly: Boolean }>`
  border: ${({ readonly }) => readonly ? 'unset' : '1px solid black'};
  cursor: ${({ readonly }) => readonly ? 'default' : 'text'};
`;
export const AccountRightStyled = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 5px;
`;

export const AccountWrapperStyled = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: calc(1rem + 24px);
`;

export const EditStyled = styled.div`
  display: flex;
  height: fit-content;

  & > svg {
    cursor: pointer;
    font-size: 24px;
  }

  & > svg:hover {
    filter: opacity(.7);
  }
`;

export const EditModeStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
