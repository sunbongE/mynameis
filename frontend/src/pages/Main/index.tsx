import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewCard from '../../components/reviewCard/ReviewCard';
import VoteCountHeart from '../../components/voteCountHeart/VoteCountHeart';
import Footer from '../../components/Footer';
import NoticeBox from '../../components/noticeBox/NoticeBox';
import Toast from '../../components/toast/Toast';
import { CustomRadioButton, SimpleRadioButton } from '../../components/Button/RadioButton';
import Header from '../../components/Header/Header';
import AlarmList from '../../components/alarm/AlarmList';

const MainContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  background-color: #f2eeea;
`;

const Main = () => {
  const [selectedVote, setSelectedVote] = useState('');

  const voteValues = [
    { id: 0, name: 'vote', value: '영호' },
    { id: 1, name: 'vote', value: '영철' },
    { id: 1, name: 'vote', value: '상철' },
  ];

  const [selectedNumber, setSelectedNumber] = useState('');

  const numberValues = [
    { id: 0, name: 'number', value: '2:2' },
    { id: 1, name: 'number', value: '3:3' },
    { id: 2, name: 'number', value: '4:4' },
  ];

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [coinSelected, setCoinSelected] = useState(false);

  const handleLogin = () => {
    console.log('로그인');
    setIsLogin(true);
  };

  const handleLogout = () => {
    console.log('로그아웃');
    setIsLogin(false);
  };
  const handleSignUp = () => {
    console.log('회원가입');
  };

  return (
    <>
      <MainContainer>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} onClickLogin={handleLogin} onClickLogout={handleLogout} onClickSignUp={handleSignUp} />
      </MainContainer>
      <MainContainer>
        <CustomRadioButton values={voteValues} version='vote' selected={selectedVote} setSelected={setSelectedVote} width='120px' />
      </MainContainer>
      <MainContainer>
        <SimpleRadioButton values={numberValues} selected={selectedNumber} setSelected={setSelectedNumber} />
      </MainContainer>
      <div>
        <AlarmList />
      </div>
    </>
  );
};

export default Main;
