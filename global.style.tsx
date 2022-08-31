import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin     : 0;
    padding    : 0;
    box-sizing : border-box;
    user-select: none;
  }
  button {
    cursor: pointer;
    outline: none;
  }
  input {
    outline: none;
  }
`;
