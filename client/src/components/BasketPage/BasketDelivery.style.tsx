import styled from "styled-components";
import { Color } from "../../utils/colors";

export const ModalTitleStyled = styled.span`
  font-size: 48px;
`;

export const ModalContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  overflow-y: auto;
  width: 100%;
  margin: 1rem 0;
  border-bottom: 1px solid ${Color.lighterGrey};
`;