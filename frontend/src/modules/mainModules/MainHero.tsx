import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Hero } from '../../assets/img/mainCouple.svg';
const StyledMainHeroContainer = styled.div`
  width: 100%;
  height: 450px;
  background-color: #716363;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MainHero = () => {
  return <Hero width='100%' />;
};

export default MainHero;
