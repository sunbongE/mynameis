import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
// import History from '../pages/History';
import Login from '../pages/auth/LoginPage';
import SignUp from '../pages/auth/SignUpPage';
import PasswordReset from '../pages/auth/PasswordReset';
import EmailAuth from '../pages/auth/EmailAuth';
import Room from '../pages/room/Room';
import ChatPage from '../pages/chatPage/ChatPage';
import CoupleMeeting from '../pages/meetingPage/CoupleMeeting';
import CoinList from '../components/coinListItem/CoinList';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />;
        <Route path='/login' element={<Login />} />;
        <Route path='/signup' element={<SignUp />} />;
        <Route path='/passwordreset' element={<PasswordReset />} />;
        <Route path='/emailauth' element={<EmailAuth />} />;
        <Route path='/chat' element={<ChatPage />} />;
        <Route path='/couple' element={<CoupleMeeting />} />
        {/* <Route path='/history' element={<History />} />; */}
        <Route path='/room/:roomId' element={<Room />} />;
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
