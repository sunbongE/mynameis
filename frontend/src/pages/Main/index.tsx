import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import MainSection from '../../modules/mainModules/MainSection';
import Footer from '../../components/Footer';
import Cookies from 'js-cookie';
import { useRecoilState, useRecoilValue, RecoilValue, useRecoilCallback } from 'recoil';
import { TokenAtom } from '../../recoil/atoms/userAuthAtom';
import { isLoginSelector } from '../../recoil/selectors/isLoginSelector';
import { userInfoState } from '../../recoil/atoms/userState';
import ActionButton from '../../components/actionButton/ActionButton';
import CoinList from '../../components/coinListItem/CoinList';
import MyModal from '../../components/modal/MyModal';
import ChatPage from '../chatPage/ChatPage';
import Header from '../../components/Header/Header';

interface Position {
  x: number;
  y: number;
}
const MainContainer = styled.div`
  width: 100%;
  background-color: #f2eeea;
  /* position: relative; */
`;

const ImgContainer = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid black;
`;
interface Review {
  id: number;
  text: string;
  reviewer: string;
}

const Main = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const isLogin = useRecoilValue(isLoginSelector);
  const setLoginState = useRecoilCallback(({ set }) => (newValue: boolean) => {
    set(isLoginSelector, newValue);
  });

  const handleLogin = () => {
    console.log('로그인');
    navigate('/login');
  };

  const handleLogout = () => {
    console.log('로그아웃');
    setMyPageOpen(false);
    setLoginState(false);
    alert('로그아웃 되었습니다.');
    window.location.reload();
  };

  const handleSignUp = () => {
    console.log('회원가입');
    navigate('/signup');
  };

  const [myPageOpen, setMyPageOpen] = useState<boolean>(false);

  const handleMyPage = () => {
    setMyPageOpen(!myPageOpen);
  };

  const [coinOpen, setCoinOpen] = useState<boolean>(false);
  const handleCoinPage = () => {
    setCoinOpen(!coinOpen);
  };

  const [faqOpen, setFaqOpen] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const tempArray = ['일', '이', '삼', '사', '오'];

  const [scrolling, setScrolling] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  const [isOpenChat, setIsOpenChat] = useState(false);

  const initialPosition: Position = {
    x: window.innerWidth - 420 - 100,
    y: window.innerHeight - 520 + 20,
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    // console.log('스크롤 값', scrollPosition);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  useEffect(() => {});
  return (
    <MainContainer>
      <Header
        isLogin={isLogin}
        onClickLogin={handleLogin}
        onClickLogout={handleLogout}
        onClickSignUp={handleSignUp}
        onClickMyPage={handleMyPage}
        isMyPageOpen={myPageOpen}
        onCoinClick={handleCoinPage}
        isCoinPageOpen={coinOpen}
        showHeader={scrolling}
      />
      <MyModal isOpen={coinOpen} setIsOpen={setCoinOpen} children={<CoinList isOpen={coinOpen} setIsOpen={setCoinOpen} />} />
      <MainSection isOpenChat={isOpenChat} setIsOpenChat={setIsOpenChat} />
      <Footer />
      <ActionButton faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
      {isOpenChat && <ChatPage initialPosition={{ x: initialPosition.x, y: initialPosition.y }} isOpenChat={isOpenChat} setIsOpenChat={setIsOpenChat} />}
    </MainContainer>
  );
};

export default Main;
