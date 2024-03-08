import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import ReviewCard from '../../components/reviewCard/ReviewCard';

const slideInAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;
/* animation: ${slideInAnimation} 1s ease; // 1초 동안 ease 애니메이션 적용 (원하는 시간 및 타이밍 함수로 수정 가능) */

const progressBarAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

interface StyledReviewContainerProps {
  slideWidth: number;
}

const StyledMainStartContainer = styled.div`
  width: 100%;
  height: 1000px;
  background-color: #f2eeea;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 150px;
`;
const StyledReviewSubTitle = styled.p`
  font-family: 'Pretendard Medium';
  color: #333333;
  letter-spacing: 4px;
  margin-bottom: 7px;
  transition: transform 0.3s ease; // 크기 변환 애니메이션
  &:hover {
    transform: scale(1.1); // hover 시 크기 확대
  }
`;
const StyledReviewTitle = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 36px;
  color: #333333;
  transition: transform 0.3s ease; // 크기 변환 애니메이션
  &:hover {
    transform: scale(1.1); // hover 시 크기 확대
  }
`;
const StyledReviewContainer = styled.div<StyledReviewContainerProps>`
  position: relative;
  display: flex;
  column-gap: 20px;
  margin-top: 60px;
  overflow: hidden;
  margin-bottom: 60px;
  width: ${(props) => props.slideWidth};
`;


const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;
  background-color: white;
  animation: ${progressBarAnimation} 10s linear infinite;
`;


const reviews = [
  {
    id: 0,
    text: '진짜 신기하게도 블라인드 소개팅이라는 게임 같은 느낌이었어요. 처음에는 상대방의 얼굴도 모르고 막연하게 대화를 시작해서 조금은 어색했는데, 그게 오히려 더 재밌는 경험이었어요. 서서히 서로에 대한 정보를 알아가면서 마치 로맨틱한 퍼즐을 맞추는 느낌이었어요. 결국엔 커플로 연결돼서 정말 기뻤어요. 후회 없이 이 서비스를 이용한 것 같아요!',
    reviewer: '2X세 김모씨',
  },
  {
    id: 1,
    text: '블라인드 소개팅의 장점 중 하나는 처음부터 상대방의 외모나 외적인 특징에 휘둘리지 않고, 성격과 개성을 중시한다는 점인 것 같아요. 처음에는 어색할 수 있지만, 서로의 정보를 공개하면서 더욱 자연스럽게 친해지고 이어지는 만남에서는 진정한 소재로 발전할 수 있어요. 이런 식의 접근 방식은 정말 새롭고 매력적이었어요.',
    reviewer: '2X세 이모씨',
  },
  {
    id: 2,
    text: '일단 처음에는 상대방이 누군지 모르니까 조금 긴장되더라고요. 그래도 정보를 조금씩 공개하면서 서로에 대해 더 알아가는 과정이 참 흥미로웠어요. 솔직히 이런 소개팅은 처음이라서 좀 어색할 줄 알았는데, 블라인드로 진행되니까 색다른 매력이 있었어요!',
    reviewer: '2X세 박모씨',
  },
];

const MainReview = () => {

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 10000); // 10초 간격으로 변경

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 clearInterval
  }, []);



  return (
    <StyledMainStartContainer>
      <StyledReviewSubTitle>REVIEW</StyledReviewSubTitle>
      <StyledReviewTitle>사용자들은 이렇게 말해요</StyledReviewTitle>
      <StyledReviewContainer slideWidth={reviews.length * 100} key={currentReviewIndex} >
        <ReviewCard color={currentReviewIndex % 2 === 0 ? 'pink' : 'dpink'} review={reviews[currentReviewIndex]} />
        <ProgressBar />
      </StyledReviewContainer>
    </StyledMainStartContainer>
  );
};

export default MainReview;
