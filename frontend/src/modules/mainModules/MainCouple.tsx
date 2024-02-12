import React from 'react';
import styled, { keyframes } from 'styled-components';
import MainCoupleImg from '../../assets/img/main_couple.svg';
import { BlinkCircle, Warn } from '../../config/IconName';
import Icon from '../../components/icon/Icon';
import { Down } from '../../config/IconName';

interface MainCoupleProps {
  scrollToRef: (ref: React.RefObject<HTMLDivElement>) => void;
  reviewRef: React.RefObject<HTMLDivElement>;
  coupleRef: React.RefObject<HTMLDivElement>;
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

const StyledMainCoupleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 695px;
  background-color: #f2eeea;
  display: flex;
  column-gap: 75px;
  justify-content: center;
  align-items: center;
  color: #333;
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

const StyledContentsContainer = styled.div`
  margin-top: 30px;
  padding-bottom: 10px;
  width: 34vw;
  margin-bottom: 50px;
`;

const StyledContents = styled.p`
  font-family: 'Pretendard Regular';
  font-size: 18px;
  color: #888;
  line-height: 27px;
  transition: transform 0.3s ease; // 크기 변환 애니메이션
  &:hover {
    transform: scale(1.1); // hover 시 크기 확대
  }
`;

const StyledWarnContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 5px;
  transition: transform 0.3s ease; // 크기 변환 애니메이션
  &:hover {
    transform: scale(1.1); // hover 시 크기 확대
  }
  
`;

const StyledWarnText = styled.p`
  font-family: 'Pretendard Regular';
  font-size: 18px;
  color: #888;
  margin-left: 5px;
`;
const StyledSvg = styled.img`
  width: 40vw;
  transition: transform 0.3s ease; // 크기 변환 애니메이션
  &:hover {
    transform: scale(1.1); // hover 시 크기 확대
  }
`;

const StyledCoupleTitleContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  transition: transform 0.3s ease; // 크기 변환 애니메이션
  &:hover {
    transform: scale(1.1); // hover 시 크기 확대
  }
`;

const StyledCoupleTitle = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 24px;
  color: #333;
  margin-left: 14px;
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


const MainCouple = ({ scrollToRef, reviewRef }: MainCoupleProps) => {

  const handleScrollToReviewClick = () => {
    scrollToRef(reviewRef);
  };


  return (
    <StyledMainCoupleContainer ref={reviewRef}>
      <StyledTextContainer>
        <StyledSubTitle>Features</StyledSubTitle>
        <StyledTitle>서로를 알아볼까요?</StyledTitle>

        <StyledContentsContainer>
          <StyledCoupleTitleContainer>
            <Icon src={BlinkCircle} />
            <StyledCoupleTitle>매칭 후 시작되는 둘만의 이야기</StyledCoupleTitle>
          </StyledCoupleTitleContainer>

          <StyledContents>매칭된 커플은 1:1 채팅 또는 화상 서비스를 통해 서로를 더 알아가는 소중한 시간을 보낼 수 있습니다.</StyledContents>
          <StyledWarnContainer>
            <Icon src={Warn} />
            <StyledWarnText>주의</StyledWarnText>
          </StyledWarnContainer>
          <StyledContents>매칭이 되어 있는 동안 다른 소개팅 진행이 불가능합니다.</StyledContents>
        </StyledContentsContainer>
      </StyledTextContainer>
      <StyledSvg src={MainCoupleImg} alt='Main couple' />
      <StyledHeroDownContainer onClick={handleScrollToReviewClick}>
        <StyledHeroDownText>My name is</StyledHeroDownText>
        <Icon src={Down} />
      </StyledHeroDownContainer>
    </StyledMainCoupleContainer>
  );
};

export default MainCouple;
