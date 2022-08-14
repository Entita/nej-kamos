import styled from 'styled-components';

export const LoginLabelStyled = styled.label`
  position: absolute;
  left: 8px;
  top: 10px;
  color: #999;
  font-size: 12px;
  z-index: 1;
  pointer-events: none;
  transition: all 150ms ease-out, font-size 150ms ease-out, top 150ms ease-out;
`;

export const LoginInputStyled = styled.input<{ value: any }>`
  width: 100%;
  border-radius: 6px;
  padding: 12px 12px 2px 12px;
  color: black;
  font-size: 14px;
  border: none;
  transition: padding 0.2s ease;
`;

export const LoginInputWrapperStyled = styled.div<{ focused: Boolean }>`
  position: relative;
  height: fit-content;

  ${LoginLabelStyled} {
    font-size: ${({ focused }) => focused && '9px'};
    top: ${({ focused }) => focused && '2px'};
    left: ${({ focused }) => focused && '10px'};
  }
`;
