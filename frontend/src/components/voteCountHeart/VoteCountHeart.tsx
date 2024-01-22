import React from 'react';
// import { Heart_Pink } from '../../config/IconName';
import Icon from '../icon/Icon';
import styled from 'styled-components';

interface VoteCountHeartProps {
  color: 'pink' | 'purple';
  count: number;
}
const VoteCountHeart = (props: VoteCountHeartProps) => {
  return (
    <Icon src={props.color} width='40px'>
      <span>{props.count}</span>
    </Icon>
  );
};

export default VoteCountHeart;
