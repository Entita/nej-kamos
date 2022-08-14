import styled from "styled-components";
import { Color } from "../../utils/colors";

export const WrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: .4rem .8rem;
  background-color: ${Color.warning};
  border-radius: 8px;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const VerifyTitleStyled = styled.span`
  color: whitesmoke;
  text-shadow: 1px 1px 5px ${Color.lightGrey};
`;

export const VerifyButtonStyled = styled.button<{ disabled: Boolean }>`
  border-radius: 4px;
  border: unset;
  background-color: rgba(0,0,0,.15);
  color: whitesmoke;
  padding: 6px 12px;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: filter .4s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  & > svg {
    font-size: 16px;
  }

  &:hover {
    filter: ${({ disabled }) => !disabled && 'brightness(.9)'};
  }
`;