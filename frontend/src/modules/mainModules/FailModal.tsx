import React from 'react';
import Button from '../../components/button/Button';
import styled from 'styled-components';

interface FailModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const ModalTitle = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 30px;
  margin-bottom: 20px;
`;

const ModalContent = styled.div`
  padding: 20px 40px;
  background-color: #f4f4f4;
  border-radius: 20px;
  font-family: 'Pretendard SemiBold';
  font-size: 16px;
  margin-bottom: 24px;
  text-align: center;
  line-height: 1.5;
`;

const FailModal = (props: FailModalProps) => {
  return (
    <ModalContainer>
      <ModalTitle>매칭이 종료되었습니다</ModalTitle>
      <ModalContent>
        😢 아쉽게도 이번에는 매칭이 성사되지 않았어요. <br />
        하지만 걱정하지 마세요! <br />
        여전히 많은 사용자들이 당신을 기다리고 있어요. <br />
        다음 기회에서 더 좋은 인연이 있을 거예요!
      </ModalContent>
      <Button onButtonClick={() => props.setIsOpen(!props.isOpen)} backgroundColor='#e1a4b4' width='168px' height='48px' borderRadius='10px' fontColor='white'>
        메인으로 가기
      </Button>
    </ModalContainer>
  );
};

export default FailModal;
