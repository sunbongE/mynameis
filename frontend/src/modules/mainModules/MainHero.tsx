import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import heroCouple from '../../assets/img/hero_couple.png';
import heroSolo from '../../assets/img/hero_solo.png';
import Button from '../../components/button/Button';
import Icon from '../../components/icon/Icon';
import { Down } from '../../config/IconName';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userState';
import { UserInfo } from '../../recoil/atoms/userState';
import { useNavigate } from 'react-router-dom';
import { CoupleMeetingUtilsProps } from '../../utils/CoupleMeetingUtilsProps';
import { instance } from '../../apis/utils/axiosInstance';
import MyModal from '../../components/modal/MyModal';
import StartModal from './StartModal';
import toast from 'react-simple-toasts';
// import { IsLoginAtom } from '../../recoil/atoms/userAuthAtom';

interface MainHeroProps {
  isOpenChat: boolean;
  setIsOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToRef: (ref: React.RefObject<HTMLDivElement>) => void;
  stepRef: React.RefObject<HTMLDivElement>;
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
  position: relative;
`;

const StyledHeroTextContainer = styled.div`
  position: absolute;
  left: 120px;
  top: 33%;
`;
const StyledHeroTitle = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 128px;
  color: #efefef;
  margin-bottom: 15px;
`;
const StyledHeroSubtitle1 = styled.p`
  font-family: 'Pretendard ExtraBold';
  font-size: 32px;
  color: #ececec;
  margin-bottom: 2px;
`;
const StyledHeroSubtitle2 = styled.p`
  font-family: 'Pretendard ExtraBold';
  font-size: 32px;
  color: #ececec;
  margin-bottom: 20px;
`;

const StyledHeroBtnContainer = styled.div`
  display: flex;
  column-gap: 15px;
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
  color: #efefef;
  text-align: center;
`;

const MainHero = ({ isOpenChat, setIsOpenChat, scrollToRef, stepRef }: MainHeroProps) => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo | null>(userInfoState);
  // const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
  const navigate = useNavigate();
  // const [isLogin, setIsLogin] = useRecoilState(IsLoginAtom);

  const [startModalOpen, setStartModalOpen] = useState<boolean>(false);

  const handleVideoBtn = () => {
    console.log('화상 버튼 클릭');
    navigate('/couple');
  };

  const handleStartBtn = () => {
    // 로그인 상태가 아니면
    if (!userInfo?.name) {
      toast('로그인 후 사용해주세요', { theme: 'dark' });
    } else {
      // 로그인 상태면
      setStartModalOpen(true);
    }
  };
  const handleChatBtn = () => {
    console.log('커플 채팅 버튼 클릭');
    setIsOpenChat(!isOpenChat);
  };

  // useRef로 섹션의 DOM 엘리먼트 참조
  const heroSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToStepClick = () => {
    scrollToRef(stepRef);
  };

  return (
    <>
      {userInfo && (
        <StyledMainHeroContainer ref={stepRef}>
          {!userInfo.coupleId && <StyledHeroImage src={heroSolo} alt='hero Solo' />}
          {userInfo.coupleId && <StyledHeroImage src={heroCouple} alt='hero Solo' />}

          <StyledHeroTextContainer>
            <StyledHeroTitle>저의 이름은</StyledHeroTitle>
            <StyledHeroSubtitle1>매 단계, 새로운 이야기.</StyledHeroSubtitle1>
            <StyledHeroSubtitle2>나만의 매력을 풀어가는 소개팅을 즐겨보세요.</StyledHeroSubtitle2>

            {userInfo.coupleId && (
              <StyledHeroBtnContainer>
                <Button backgroundColor='#E1A4B4' width='100px' height='40px' borderRadius='15px' fontColor='white' onButtonClick={handleChatBtn}>
                  채팅하기
                </Button>
                <Button backgroundColor='#fff' width='100px' height='40px' borderRadius='15px' fontColor='#E1A4B4' onButtonClick={handleVideoBtn}>
                  화상채팅
                </Button>
              </StyledHeroBtnContainer>
            )}
            {!userInfo.coupleId && (
              <>
                <Button onButtonClick={handleStartBtn} backgroundColor='#E1A4B4' width='100px' height='40px' borderRadius='15px' fontColor='white'>
                  시작하기
                </Button>
                <MyModal isOpen={startModalOpen} setIsOpen={setStartModalOpen}>
                  <StartModal isOpen={startModalOpen} setIsOpen={setStartModalOpen} />
                </MyModal>
              </>
            )}
          </StyledHeroTextContainer>

          <StyledHeroDownContainer onClick={handleScrollToStepClick}>
            <StyledHeroDownText>My name is</StyledHeroDownText>
            <Icon src={Down} />
          </StyledHeroDownContainer>
        </StyledMainHeroContainer>
      )}
    </>
  );
};

export default MainHero;
