import styled from "styled-components";
import { Color } from "../../utils/colors";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

export const ModalWrapperStyled = styled.div`
  position: relative;
  display: flex;
  gap: 3rem;
  padding: 0 3rem 0.5rem 3rem;
  border-bottom: 1px solid ${Color.lighterGrey};

  &::before {
    content: '';
    position: absolute;
    background-color: ${Color.subcategory};
    height: 4px;
    width: calc(100% - 6rem);
    top: calc(50% - .25rem - 2px);
  }
`;

export const ModalIndexStyled = styled.span<{ index: Boolean }>`
  font-size: 24px;
  background-color: ${Color.lightGrey};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ index }) => index && 'bold'};
  color: ${({ index }) => index ? Color.warning : 'whitesmoke'};
  cursor: pointer;
  z-index: 1;
`;

export const ModalContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
`;

export const ModalButtonWrapperStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ModalButtonStyled = styled.button`
  width: 150px;
  padding: 8px 12px;
  border: unset;
  border-radius: 4px;
  font-size: 15px;
  letter-spacing: 1px;
  color: whitesmoke;
  transition: filter .4s ease;

  &:hover {
    filter: opacity(.8);
  }
`;
export const ModalNextButtonStyled = styled(ModalButtonStyled)`
  background-color: ${Color.lightGreen};
  margin-left: auto;
`;
export const ModalPrevButtonStyled = styled(ModalButtonStyled)`
  background-color: ${Color.lightRed};
`;
export const ModalCompleteButtonStyled = styled(ModalButtonStyled)`
  background-color: ${Color.lightGreen};
  margin-left: auto;
`;