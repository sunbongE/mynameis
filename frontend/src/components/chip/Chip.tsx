import React from 'react';
import styled from 'styled-components';
import { DelBtn } from '../../config/IconName';
import Icon from '../icon/Icon';

interface ChipProps {
  keyword: string;
  id: any;
  onDeleteItem?: (value: string) => void;
}

const StyledChipContainer = styled.span`
  margin-right: 8px;
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
  padding: 0 3px;
`;

const Chip = (props: ChipProps) => {
  const onDelete = (id: any) => {
    if (props.onDeleteItem) {
      props.onDeleteItem(id);
    }
  };

  return (
    <StyledChipContainer>
      <StyledText>{props.keyword}</StyledText>
      <div onClick={() => onDelete(props.id)}>
        <Icon src={DelBtn} width='15px' />
      </div>
    </StyledChipContainer>
  );
};

export default Chip;
