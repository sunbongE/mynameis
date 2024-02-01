import React from 'react';
import styled from 'styled-components';
import MainHero from './MainHero';
import MainStep from './MainStep';
import MainCouple from './MainCouple';
import MainReview from './MainReview';
import MainStart from './MainStart';

const StyledMainSectionContainer = styled.div`
  width: 100%;
  min-height: 70vh;
`;
const MainSection = () => {
  return (
    <StyledMainSectionContainer>
      <MainHero />
      <MainStep />
      <MainCouple />
      {/* <MainReview /> */}
      <MainStart />
    </StyledMainSectionContainer>
  );
};

export default MainSection;
