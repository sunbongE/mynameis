import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/button/Button';
import { CustomRadioButton } from '../../components/button/RadioButton';
import Timer from '../../components/timer/Timer';

interface VoteModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  voteValues: Array<Object>;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 5px;
  width: 30vw;
`;

const VoteTimerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
`;

const VoteTitle = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 24px;
  margin-bottom: 8px;
`;

const VoteContent = styled.div`
  font-family: 'Pretendard Medium';
  margin-bottom: 20px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2px;
  margin-top: -10px;
`;

const StyledText = styled.p`
  font-family: 'Pretendard Bold';
  color: #ff5555;
`;

const VoteModal = (props: VoteModalProps) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  return (
    <ModalContainer>
      <VoteTimerContainer>
        {props.state === 'step12345_vote' && <StyledText>최종 선택</StyledText>}
        <Timer time={props.time} state={props.state} setState={props.setState} repeatCount={0} />
      </VoteTimerContainer>
      <VoteContainer>
        <VoteTitle>마음에 드는 이성을 선택해주세요!</VoteTitle>
        <VoteContent>
          {props.state === 'step12_vote' && '투표 결과는 상대방에게 익명으로 전달됩니다.'}
          {props.state === 'step123_vote' && '투표 결과는 상대방에게 이름과 함께 전달됩니다!'}
          {props.state === 'step12345_vote' && '투표 결과를 통해 새로운 커플이 탄생 됩니다!'}
        </VoteContent>
        <div style={{ pointerEvents: isClick ? 'none' : 'auto' }}>
          <RadioButtonContainer>
            <CustomRadioButton values={props.voteValues} selected={props.selectedValue} setSelected={props.setSelectedValue} version='vote' width='120px' />
          </RadioButtonContainer>
        </div>
        {!isClick ? (
          <Button
            backgroundColor='#e1a4b4'
            width='168px'
            height='48px'
            borderRadius='10px'
            fontColor='white'
            onButtonClick={() => {
              setIsClick(true);
              props.setIsSelected(true);
            }}
          >
            선택하기
          </Button>
        ) : (
          <Button backgroundColor='#e1a4b4' width='168px' height='48px' borderRadius='10px' fontColor='white'>
            대기...
          </Button>
        )}
      </VoteContainer>
    </ModalContainer>
  );
};

export default VoteModal;
