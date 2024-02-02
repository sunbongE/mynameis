import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import History from '../pages/History';
import Login from '../pages/auth/LoginPage';
import SignUp from '../pages/auth/SignUpPage';
import PasswordReset from '../pages/auth/PasswordReset';
import EmailAuth from '../pages/auth/EmailAuth';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />;
        <Route path='/login' element={<Login />} />;
        <Route path='/signup' element={<SignUp />} />;
        <Route path='/passwordreset' element={<PasswordReset/>} />;
        <Route path='/emailauth' element={<EmailAuth/>} />;
        <Route path='/history' element={<History />} />;
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
