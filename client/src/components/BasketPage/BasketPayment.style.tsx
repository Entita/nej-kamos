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
  gap: .6rem;
`;

export const PaymentButtonStyled= styled.button<{ focused: Boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  width: 150px;
  border-radius: 4px;
  letter-spacing: 1px;
  background-color: ${Color.lightGreen};
  border: 2px solid rgba(0,0,0, .5);
  color: rgba(0,0,0, .7);
  font-weight: bold;
  filter: ${({ focused }) => focused && 'brightness(.5)'};

  &:hover {
    filter: ${({ focused }) => !focused && 'opacity(.8)'};
  }

  & > svg {
    color: rgba(0,0,0, .65);
  }
`;