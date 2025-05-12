// src/GlobalStyle.js
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
    background-color: #eee5e9;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyle;
