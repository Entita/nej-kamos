import styled from "styled-components";
import { Color } from "../../utils/colors";

export const WrapperStyled = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(1px) brightness(.6);
  z-index: 11;
`;

export const ModalWrapperStyled = styled.div`
  position: relative;
  width: 500px;
  background-color: white;
  padding: 1.2rem 2rem;
  border-radius: 18px;
`;

export const ModalTitleStyled = styled.h1`
  text-align: center;
  font-family: 'Raleway';
`;

export const ModalLinkStyled = styled.a`
  text-decoration: underline;
  color: ${Color.gray};
  width: fit-content;
  cursor: pointer;

  &:hover {
    filter: opacity(.5);
  }
`;

export const ModalInputWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0 24px 0;
`;

export const ModalLinkWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ModalControlsWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: 37.5% 25% 37.5%;
`;

export const ModalButtonStyled = styled.button`
  border: unset;
  border-radius: 24px;
  padding: 2px 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Color.mainYellow};
  color: white;
  cursor: pointer;

  & > svg {
    font-size: 40px;
  }

  &:hover {
    filter: opacity(.5);
  }
`;

export const LoadingStyled = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  backdrop-filter: brightness(.8);

  & > div {
    width: 60px;
    height: 60px;
    border-width: 6px;
  }
`;
