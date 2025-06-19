// src/GlobalStyle.js
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
    background-color: #eee5e9;
  }  

  body {
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;    
    min-height: 80vh;
  }

  img {
    max-width: 100%;
    height: auto;
  }

`;

export default GlobalStyle;
