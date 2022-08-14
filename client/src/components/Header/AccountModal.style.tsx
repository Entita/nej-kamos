import styled from "styled-components";

export const WrapperStyled = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: brightness(.75) blur(2px);
  z-index: 11;
`;

export const ContainerStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 20rem;
  border-radius: 12px;
  background-color: white;
  padding: .6rem 1.2rem .8rem 1.2rem;
  justify-content: space-between;
`;

export const CancelButtonStyled = styled.div`
  position: absolute;
  display: flex;
  top: .4rem;
  right: .6rem;
  cursor: pointer;

  & > svg {
    width: 20px;
    height: 20px;
  }
`;

export const TitleStyled = styled.span`
  font-size: 24px;
`;
export const ButtonStyled = styled.button``;

export const ChangeTypeButtonStyled = styled.button`
  border: none;
  width: fit-content;
  background-color: inherit;
  text-decoration: underline;

  &:hover {
    filter: opacity(.8);
  }
`;

export const ControlStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;