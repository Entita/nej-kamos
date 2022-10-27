import styled, { css } from "styled-components";
import { Color } from "../../utils/colors";

export const WrapperStyled = styled.div`
  
`;

export const TitleStyled = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

export const TitleInfoStyled = styled.span`
  color: ${Color.darkGray};
  font-size: 20px;
  margin-bottom: 1px;
`;

export const ExpandButtonStyled = styled.div<{ open: Boolean, angle: Number }>`
  position: absolute;
  display: flex;
  right: 0;
  bottom: -6px;
  cursor: pointer;

  & > svg {
    rotate: ${({ angle }) => `${angle}deg`};
    transition: rotate .25s ease-out;
    font-size: 39px;
    color: ${Color.mainYellow};
  }
`;

export const DropdownTogglerStyled = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  column-gap: 4px;
  min-width: 40vw;
  padding: 6px 0 6px 0;
  border-bottom: 1px solid black;
`;

export const DropdownStyled = styled.div<{ open: Boolean }>`
  max-height: 0;
  overflow: hidden;
  /* clip-path: inset(0 0 100% 0); */
  /* transition: clip-path .25s ease-in, max-height .25s ease-in; */

  ${({ open }) => open && css`
    max-height: 500px;
    padding: 6px 0;
    /* clip-path: inset(0 0 0 0); */
    /* transition: clip-path .15s ease-out, max-height .15s ease-out; */
  `}
`;
