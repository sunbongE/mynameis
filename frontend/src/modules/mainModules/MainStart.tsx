import React from 'react';
import styled from 'styled-components';
import Button from '../../components/button/Button';

const StyledMainStartContainer = styled.div`
  width: 100%;
  height: 450px;
  background-color: #716363;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledMainStartTextContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledMainStartText = styled.p`
  font-family: 'Pretendard SemiBold';
  color: #fff;
  font-size: 26px;
  margin: 3px 0;
  transition: transform 0.3s ease; // 크기 변환 애니메이션
  &:hover {
    transform: scale(1.1); // hover 시 크기 확대
  }
`;

const MainStart = () => {
  return (
    <StyledMainStartContainer>
      <StyledMainStartTextContainer>
        <StyledMainStartText>함께하는 모든 단계가 의미 있는 '저의 이름은'을 경험해보세요.</StyledMainStartText>
        <StyledMainStartText>특별한 순간이 여기서 시작됩니다!</StyledMainStartText>
      </StyledMainStartTextContainer>
      <Button backgroundColor='#e1a4b4' width='120px' height='48px' borderRadius='30px' fontColor='white'>
        시작하기
      </Button>
    </StyledMainStartContainer>
  );
};

export default MainStart;
