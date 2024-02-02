import React from 'react';
// import { Heart_Pink } from '../../config/IconName';
import Icon from '../icon/Icon';
import styled from 'styled-components';
import { Heart_Pink, Heart_Purple } from '../../config/IconName';

interface VoteCountHeartProps {
  color: 'pink' | 'purple';
  count: number;
}
const VoteCountHeart = (props: VoteCountHeartProps) => {
  const iconSrc = props.color === 'pink' ? Heart_Pink : Heart_Purple;

  return (
    <Icon src={iconSrc} width='40px'>
      <span style={{ fontFamily: 'Pretendard Regular' }}>{props.count}</span>
    </Icon>
  );
};

export default VoteCountHeart;
