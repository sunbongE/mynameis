import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewCard from '../../components/reviewCard/ReviewCard';
import VoteCountHeart from '../../components/voteCountHeart/VoteCountHeart';
import Footer from '../../components/Footer';
import NoticeBox from '../../components/noticeBox/NoticeBox';
import Toast from '../../components/toast/Toast';
import { CustomRadioButton, SimpleRadioButton } from '../../components/button/RadioButton';
// import Header from '../../components/header/Header';

const MainContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
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

  return (
    <>
      <MainContainer>
        <CustomRadioButton values={voteValues} version='vote' selected={selectedVote} setSelected={setSelectedVote} width='120px' />
      </MainContainer>
      <MainContainer>
        <SimpleRadioButton values={numberValues} selected={selectedNumber} setSelected={setSelectedNumber} />
      </MainContainer>
    </>
  );
};

export default Main;
