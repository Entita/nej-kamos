import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin     : 0;
    padding    : 0;
    box-sizing : border-box;
    user-select: none;

    @font-face {
        font-family: 'Tall Thin';
        src: url('./fonts/GLECB.ttf') format('truetype'),
    }
  }
  button {
    cursor: pointer;
    outline: none;
  }
  input {
    outline: none;
  }
`;
