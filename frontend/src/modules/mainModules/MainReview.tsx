import React from 'react';
import styled, { keyframes } from 'styled-components';
import ReviewCard from '../../components/reviewCard/ReviewCard';
// const slideAnimation = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(-100%);
//   }
// `;

/* animation: ${slideAnimation} 10s linear infinite; */

const StyledMainStartContainer = styled.div`
  width: 100%;
  height: 900px;
  background-color: #f2eeea;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledReviewSubTitle = styled.p`
  font-family: 'Pretendard Medium';
  color: #333333;
  letter-spacing: 4px;
  margin-bottom: 7px;
`;
const StyledReviewTitle = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 36px;
  color: #333333;
`;
const StyledReviewContainer = styled.div`
  display: flex;
  column-gap: 20px;
  margin-top: 60px;
  overflow: hidden;
  margin-bottom: 60px;
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
    reviewer: '2X세 김모씨',
  },
  {
    id: 2,
    text: '일단 처음에는 상대방이 누군지 모르니까 조금 긴장되더라고요. 그래도 정보를 조금씩 공개하면서 서로에 대해 더 알아가는 과정이 참 흥미로웠어요. 솔직히 이런 소개팅은 처음이라서 좀 어색할 줄 알았는데, 블라인드로 진행되니까 색다른 매력이 있었어요!',
    reviewer: '2X세 김모씨',
  },
];

const MainReview = () => {
  return (
    <StyledMainStartContainer>
      <StyledReviewSubTitle>REVIEW</StyledReviewSubTitle>
      <StyledReviewTitle>사용자들은 이렇게 말해요</StyledReviewTitle>
      <StyledReviewContainer>{reviews.map((review, index) => (review.id % 2 === 0 ? <ReviewCard color='pink' review={review} /> : <ReviewCard color='dpink' review={review} />))}</StyledReviewContainer>
    </StyledMainStartContainer>
  );
};

export default MainReview;
