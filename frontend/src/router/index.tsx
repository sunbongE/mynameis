import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import History from '../pages/History';
import Room from '../pages/room/Room';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />;
        <Route path='/history' element={<History />} />;
        <Route path='/room' element={<Room />} />;
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
