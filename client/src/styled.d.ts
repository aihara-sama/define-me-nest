import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blue: {
        100: string;
      };
      white: {
        100: string;
        200: string;
        300: string;
      };
      black: {
        100: string;
        200: string;
      };
      red: {
        100: string;
        200: string;
      };
    };
    sizes: {
      primary: number;
    };
  }
}
