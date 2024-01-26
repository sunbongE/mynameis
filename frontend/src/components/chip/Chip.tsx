import React from 'react';
import styled from 'styled-components';
import { DelBtn } from '../../config/IconName';
import Icon from '../icon/Icon';

interface ChipProps {
  keyword: string;
}

const StyledChipContainer = styled.div`
  border-radius: 20px;
  height: 27px;
  color: '#fff';
  background-color: #8292aa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
`;

const StyledText = styled.p`
  width: 100%;
  font-size: 12px;
  color: #fff;
  font-family: 'Pretendard Regular';
  width: 100%;
  margin-right: 3px;
`;
const StyledDeleteBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Chip = (props: ChipProps) => {
  return (
    <StyledChipContainer>
      <StyledText>{props.keyword}</StyledText>

      <Icon src={DelBtn} />
    </StyledChipContainer>
  );
};

export default Chip;
