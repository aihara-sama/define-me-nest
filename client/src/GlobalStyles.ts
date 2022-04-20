import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Serif', serif;
  }

  html, body, #root {
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  body {
    background: ${({ theme }) => theme.colors.blue[100]}; 
    padding: 0 1rem;
  }

  img {
    max-width: 100%;
  }

  hr {
    border-color: ${({ theme }) => theme.colors.white[200]};
  }
`;

export default GlobalStyles;
