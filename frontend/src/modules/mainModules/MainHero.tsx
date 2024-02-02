import React from 'react';
import styled from 'styled-components';
import heroCouple from '../../assets/img/hero_couple.png';
const StyledMainHeroContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  background-color: #f2eeea;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
// const StyledHero = styled(Hero)`
//   width: 100%; // Set the width to 100%
// `;
const StyledHeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // 이미지가 container를 가득 채우도록 설정
`;
const MainHero = () => {
  return (
    <StyledMainHeroContainer>
      <StyledHeroImage src={heroCouple} alt='hero Couple' />
    </StyledMainHeroContainer>
  );
};

export default MainHero;
