import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './styles/globalStyle';
import './styles/fonts/font.css';
import { RecoilRoot } from 'recoil';
import ActionButton from './components/actionButton/ActionButton';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const App = () => {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  );
};
root.render(<App />);

reportWebVitals();
