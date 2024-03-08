import React, { useState } from 'react';
import styled, {keyframes} from 'styled-components';
import Icon from '../icon/Icon';
import { Quote } from '../../config/IconName';

interface Review {
  id: number;
  text: string;
  reviewer: string;
}

interface ReviewCardProps {
  color: string;
  review: Review;
}

const ReviewCardContainer = styled.div<ReviewCardProps, any>`
  width: 900px;
  height: 380px;
  border-radius: 12px;
  background: ${(props) => (props.color === 'pink' ? '#E8B8C5' : '#E1A3B3')};
  display: flex;
  flex-direction: column;
  padding: 100px 50px 0 50px;
`;

const ReviewText = styled.p`
  font-family: 'Pretendard Medium';
  font-size: 22px;
  color: #fff;
  line-height: 36px;
  margin-top: 10px;
`;

const Reivewer = styled.p`
  font-family: 'Pretendard Regular';
  font-size: 20px;
  color: #fff;
  text-align: right;
`;

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;


const StyledReviewCardContent = styled.div`
  animation: ${fadeInAnimation} 2s ease; // 1초 동안 ease 애니메이션 적용 (원하는 시간 및 타이밍 함수로 수정 가능);
`;

const ReviewCard = (props: ReviewCardProps) => {
  return (
    <ReviewCardContainer color={props.color}>
      <StyledReviewCardContent>
      <Icon src={Quote} width='30px' />
      <ReviewText>{props.review.text}</ReviewText>
      <Reivewer>{props.review.reviewer}</Reivewer>
      </StyledReviewCardContent>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
