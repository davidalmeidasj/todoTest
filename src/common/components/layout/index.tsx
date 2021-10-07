import * as React from "react";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import {mainTheme} from "../../utils/theme";

interface Props {
  children: React.ReactNode;
}

const Main = styled.main`
  margin: 0 auto;
  max-width: ${(props) => props.theme.size.maxWidth};
`;

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={mainTheme}>
      <GlobalStyles />
      <Main>{children}</Main>
    </ThemeProvider>
  );
};

// font-family: 'Abel', sans-serif;

const GlobalStyles = createGlobalStyle`
    body {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      line-height: 2;
      background: ${({ theme }) => theme.colors.background};
      color: ${({ theme }) => theme.colors.text};
    }

    ul,li{
      list-style:none;
    }

    h3{
      font-size: ${(props) => props.theme.size.h3};
    }
   

`;

export default Layout;
