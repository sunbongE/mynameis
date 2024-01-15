import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import History from '../pages/History';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />;
        <Route path='/history' element={<History />} />;
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
