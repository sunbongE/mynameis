import React from 'react';
import styled, { keyframes } from 'styled-components';
import MainStepImg from '../../assets/img/main_step.svg';
import { BlinkRed } from '../../config/IconName';
import Icon from '../../components/icon/Icon';
import { Down } from '../../config/IconName';

interface MainStepProps {
  scrollToRef: (ref: React.RefObject<HTMLDivElement>) => void;
  coupleRef: React.RefObject<HTMLDivElement>;
  stepRef:React.RefObject<HTMLDivElement>;
}

const fadeInDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0) translateX(-50%);
  }
  100% {
    opacity: 1;
    transform: translateY(20px) translateX(-50%);
  }
`;

const StyledMainStepContainer = styled.div`
  position: relative;
  width: 100%;
  height: 695px;
  background-color: #f2eeea;
  display: flex;
  column-gap: 85px;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;

const StyledSvg = styled.img`
  width: 40vw;
  transition: transform 0.3s ease; // 크기 변환 애니메이션
  &:hover {
    transform: scale(1.1); // hover 시 크기 확대
  }
`;
const StyledTextContainer = styled.div`
  width: 37vw;
`;

const StyledSubTitle = styled.p`
  font-family: 'Pretendard Medium';
  color: #333333;
  letter-spacing: 4px;
  margin-bottom: 7px;
  transition: transform 0.3s ease; // 크기 변환 애니메이션
  &:hover {
    transform: scale(1.1); // hover 시 크기 확대
  }
`;
const StyledTitle = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 36px;
  color: #333333;
  transition: transform 0.3s ease; // 크기 변환 애니메이션
  &:hover {
    transform: scale(1.1); // hover 시 크기 확대
  }
`;

const StyledStep = styled.div`
  margin-top: 30px;
  padding-bottom: 10px;
  transition: transform 0.3s ease; // 크기 변환 애니메이션
  &:hover {
    transform: scale(1.1); // hover 시 크기 확대
  }
`;
const StyledStepTextContainer = styled.div`
  display: flex;
`;
const StyledStepText = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 18px;
  color: #333;
  margin-left: 7px;
`;

const StyledStepContents = styled.p`
  font-family: 'Pretendard Regular';
  font-size: 18px;
  color: #888;
  margin-top: 10px;
  line-height: 27px;
`;

const StyledHeroDownContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  &:hover {
    animation: ${fadeInDown} 1s ease forwards; // 애니메이션 적용 (1초 동안 ease)
  }
  cursor: pointer;
`;

const StyledHeroDownText = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 20px;
  color: black;
  text-align: center;
`;

const MainStep = ({ scrollToRef, coupleRef }: MainStepProps) => {
  
  const handleScrollToCoupleClick = () => {
    scrollToRef(coupleRef);
  };

  return (
    <StyledMainStepContainer ref={coupleRef}>
      <StyledSvg src={MainStepImg} alt='Main Step' />
      <StyledTextContainer>
        <StyledSubTitle>features</StyledSubTitle>
        <StyledTitle>이런 단계를 거쳐요</StyledTitle>
        <StyledStep>
          <StyledStepTextContainer>
            <Icon src={BlinkRed} />
            <StyledStepText>블라인드 소개 단계</StyledStepText>
          </StyledStepTextContainer>
          <StyledStepContents>나이, 성별, 목소리, 지역만을 공개하여 자신을 나타내보세요.</StyledStepContents>
        </StyledStep>
        <StyledStep>
          <StyledStepTextContainer>
            <Icon src={BlinkRed} />
            <StyledStepText>흥미와 특기 공개 단계</StyledStepText>
          </StyledStepTextContainer>
          <StyledStepContents>흥미, 특기 그리고 직업을 단계적으로 공유해보세요.</StyledStepContents>
        </StyledStep>
        <StyledStep>
          <StyledStepTextContainer>
            <Icon src={BlinkRed} />
            <StyledStepText>얼굴 공개 및 취향 탐색 단계</StyledStepText>
          </StyledStepTextContainer>
          <StyledStepContents>상대방의 얼굴을 확인한 후, 추가 질문을 통해 서로의 취향과 성격을 알아가는 시간을 가져보세요.</StyledStepContents>
        </StyledStep>
        <StyledStep>
          <StyledStepTextContainer>
            <Icon src={BlinkRed} />
            <StyledStepText>투표 및 매칭 단계</StyledStepText>
          </StyledStepTextContainer>
          <StyledStepContents>서로에게 관심이 있을 경우 투표로 매칭을 결정하고, 매칭된 분들은 1 : 1 시간을 가져 자유롭게 대화할 수 있어요.</StyledStepContents>
        </StyledStep>
      </StyledTextContainer>
      <StyledHeroDownContainer onClick={handleScrollToCoupleClick}>
        <StyledHeroDownText>My name is</StyledHeroDownText>
        <Icon src={Down} />
      </StyledHeroDownContainer>
    </StyledMainStepContainer>
  );
};

export default MainStep;
