import React, { useState } from 'react';
import styled from 'styled-components';
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

const ReviewCard = (props: ReviewCardProps) => {
  return (
    <ReviewCardContainer color={props.color}>
      <Icon src={Quote} width='30px' />
      <ReviewText>{props.review.text}</ReviewText>
      <Reivewer>{props.review.reviewer}</Reivewer>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
