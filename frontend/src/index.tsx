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
  const [faqOpen, setFaqOpen] = useState<boolean>(false);

  return (
    <RecoilRoot>
      <GlobalStyle />
      <Router />
      <ActionButton faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
    </RecoilRoot>
  );
};
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
