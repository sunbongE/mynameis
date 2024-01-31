import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';

const MainContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  background-color: #f2eeea;
`;

const Main = () => {
  const navigate = useNavigate();

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

  return (
    <>
      <MainContainer>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} onClickLogin={handleLogin} onClickLogout={handleLogout} onClickSignUp={handleSignUp} onClickMyPage={handleMyPage} isMyPageOpen={myPageOpen} />
      </MainContainer>
      <MainContainer>
        <Button
          backgroundColor={'#e1a4b4'}
          width={'200px'}
          height={'80px'}
          borderRadius={'16px'}
          onButtonClick={() => {
            navigate('/room');
          }}
        >
          준비페이지로 이동
        </Button>
      </MainContainer>
    </>
  );
};

export default Main;
