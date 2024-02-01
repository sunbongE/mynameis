import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import History from '../pages/History';
import ChatPage from '../pages/chatPage/ChatPage';
import CoupleMeeting from '../pages/meetingPage/CoupleMeeting';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />;
        <Route path='/chat' element={<ChatPage />} />;
        <Route path='/couple' element={<CoupleMeeting />} />;
        <Route path='/history' element={<History />} />;
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
