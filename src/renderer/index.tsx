import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import { App } from './App';
import { Store } from './redux';

const wrapper = document.getElementById('root');
const root = createRoot(wrapper);

const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: transparent;
    color: #ffffff;
    -webkit-app-region: drag;
    overflow: hidden;
  }
  div {
    user-select: none;
  }
`;

root.render(
  <>
    <GlobalStyle />
    <Provider store={Store} >
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </>
);
