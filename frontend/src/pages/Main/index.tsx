import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import MainSection from '../../modules/mainModules/MainSection';
import Footer from '../../components/footer/Footer';

const MainContainer = styled.div`
  width: 100%;
  background-color: #f2eeea;
`;

const ImgContainer = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid black;
`;

const ChatContainer = styled.div`
  background-color: #000;
`;

const Main = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleLogin = () => {
    console.log('로그인');
    setIsLogin(true);
  };

  const handleLogout = () => {
    console.log('로그아웃');
    setMyPageOpen(false);
    setIsLogin(false);
  };
  const handleSignUp = () => {
    console.log('회원가입');
  };

  const [myPageOpen, setMyPageOpen] = useState<boolean>(false);

  const handleMyPage = () => {
    setMyPageOpen(!myPageOpen);
  };

  const [faqopen, setFaqOpen] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <MainContainer>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} onClickLogin={handleLogin} onClickLogout={handleLogout} onClickSignUp={handleSignUp} onClickMyPage={handleMyPage} isMyPageOpen={myPageOpen} />
      <MainSection />
      <Footer />
    </MainContainer>
  );
};

export default Main;
