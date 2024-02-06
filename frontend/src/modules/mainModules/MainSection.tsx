import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainHero from './MainHero';
import MainStep from './MainStep';
import MainCouple from './MainCouple';
import MainReview from './MainReview';
import MainStart from './MainStart';
interface MainSectionProps {
  isOpenChat: boolean;
  setIsOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledMainSectionContainer = styled.div`
  width: 100%;
  min-height: 70vh;
`;

const MainSection = ({ isOpenChat, setIsOpenChat }: MainSectionProps) => {
  useEffect(() => {
    console.log('열렸니', isOpenChat);
  }, [isOpenChat]);
  return (
    <StyledMainSectionContainer>
      <MainHero isOpenChat={isOpenChat} setIsOpenChat={setIsOpenChat} />
      <MainStep />
      <MainCouple />
      <MainReview />
      <MainStart />
    </StyledMainSectionContainer>
  );
};

export default MainSection;
