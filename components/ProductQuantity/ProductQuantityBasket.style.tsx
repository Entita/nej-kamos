import styled from 'styled-components';

export const RemoveButtonStyled = styled.div<any>`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  filter: ${({ disabled }) => disabled && 'saturate(0.3);'};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};

  & > div {
    position: absolute;
    backdrop-filter: blur(0.8);
    top: calc(50% - 10px);
    left: calc(50% - 10px);
  }

  & > svg {
    font-size: 14px;
  }
`;