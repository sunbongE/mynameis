import React, { useEffect, useState, useRef } from 'react';
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

  const stepRef = useRef<HTMLDivElement>(null);
  const coupleRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>, offsetPercent: number = -100) => {
    if (ref.current) {
      const offset = ref.current.offsetTop - (window.innerHeight * offsetPercent) / 100;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <StyledMainSectionContainer>
      <MainHero isOpenChat={isOpenChat} setIsOpenChat={setIsOpenChat} scrollToRef={() => scrollToRef(stepRef)} stepRef={stepRef} />
      <MainStep stepRef={stepRef} scrollToRef={() => scrollToRef(coupleRef)} coupleRef={coupleRef} />
      <MainCouple coupleRef={coupleRef} scrollToRef={() => scrollToRef(reviewRef)} reviewRef={reviewRef} />
      <MainReview />
      <MainStart />
    </StyledMainSectionContainer>
  );
};

export default MainSection;
