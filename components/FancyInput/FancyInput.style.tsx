import styled, { css } from 'styled-components';

export const LoginLabelStyled = styled.label`
  position: absolute;
  color: #999;
  z-index: 1;
  pointer-events: none;
  transition: all 150ms ease-out, font-size 150ms ease-out, top 150ms ease-out;
`;

export const LoginInputStyled = styled.input<{ value: any }>`
  position: relative;
  width: 100%;
  border-radius: 6px;
  padding: 12px 0 2px 0;
  color: black;
  border: none;
  transition: padding 0.2s ease;
`;

export const LoginInputWrapperStyled = styled.div<any>`
  position: relative;
  height: fit-content;
  border-bottom: 1px solid black;

  ${LoginLabelStyled} {
    ${({ size }) =>
      size === 'small' ?
        css`
          font-size: ${({ focused }: any) => focused ? '9px' :'12px'};
          top: ${({ focused }: any) => focused ? '2px' : '10px'};
          left: ${({ focused }: any) => focused ? '2px' : '0'};
        ` :
      size === 'medium' ?
        css`
          font-size: ${({ focused }: any) => focused ? '15px' :'20px'};
          top: ${({ focused }: any) => focused ? '0' : '10px'};
          left: ${({ focused }: any) => focused ? '2px' : '0'};
        ` :
      (size === 'large' ?
        css`
          font-size: ${({ focused }: any) => focused ? '21px' :'32px'};
          top: ${({ focused }: any) => focused ? '0' : '12px'};
          left: ${({ focused }: any) => focused ? '2px' : '0'};
        ` : '')}
  }

  ${LoginInputStyled} {
    ${({ size }) =>
      size === 'small' ?
        css`
          font-size: 14px;
        ` :
      size === 'medium' ?
        css`
          font-size: 18px;
          padding-top: 14px;
        ` :
      (size === 'large' ?
        css`
          font-size: 24px;
          padding-top: 22px;
        ` : '')}
  }
`;
