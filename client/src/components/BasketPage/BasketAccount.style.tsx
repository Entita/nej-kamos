import styled from "styled-components";
import { Color } from "../../utils/colors";
import { LoginInputWrapperStyled } from "../Features/FancyInput/FancyInput.style";

export const ModalTitleStyled = styled.span`
  font-size: 48px;
`;

export const ModalContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 50vh;
  overflow-y: auto;
  width: 100%;
  margin: 1rem 0;
  border-bottom: 1px solid ${Color.lighterGrey};
  gap: 1rem;

  & > ${LoginInputWrapperStyled} {
    border-bottom: 1px solid black;
  }
`;

export const AccountInputsWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  row-gap: 1rem;

  & > div {
    border-bottom: 1px solid black;
  }
`;

export const AccountInputStyled = styled.input`
  font-size: 48px;
`;
