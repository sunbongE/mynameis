import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Star } from '../../config/IconName';
import Icon from '../icon/Icon';

interface ActionButtonProps {
  faqOpen: boolean;
  setFaqOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 20px;
`;

const StyledActionButton = styled.div`
  font-family: 'Pretendard Regular';
  font-size: 36px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: white;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FaqContainer = styled.div`
  position: absolute;
  bottom: 70px;
  background-color: white;
  border-radius: 10px;
  width: 360px;
  padding: 35px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.2s ease-in-out; /* fade-in 애니메이션 적용 */
`;

const FaqHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  margin-bottom: 20px;
`;

interface TextStyleProps {
  fontSize: string;
  margin?: string;
}

const StyledText = styled.p<TextStyleProps>`
  font-family: 'Pretendard SemiBold';
  font-size: ${(props) => props.fontSize};
  margin-bottom: ${(props) => (props.margin ? props.margin : 0)};
  line-height: 1.5;
`;

const TextContainer = styled.div`
  margin-left: 14px;
  margin-top: 8px;
`;

const FaqCard = styled.div`
  width: 100%;
  background-color: #ececec;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 8px;
`;

const ActionButton = (props: ActionButtonProps) => {
  return (
    <ActionButtonContainer className='action-button-container'>
      <StyledActionButton
        onClick={() => {
          props.setFaqOpen(!props.faqOpen);
        }}
      >
        ?
      </StyledActionButton>
      {props.faqOpen && (
        <FaqContainer>
          <FaqHeader>
            <Icon src={Star} width='20px' height='20px' />
            <StyledText fontSize='20px'>이용가이드</StyledText>
            <Icon src={Star} width='20px' height='20px' />
          </FaqHeader>
          <FaqCard>
            <StyledText fontSize='12px' margin='5px'>
              Q. 서비스 이용 금액은 얼마인가요?
            </StyledText>
            <StyledText fontSize='12px'>
              A. 매칭 1회 이용 금액은 30코인이며, 현재 코인은 10코인에 <br /> 1000원으로 판매되고 있습니다.
            </StyledText>
          </FaqCard>
          <FaqCard>
            <StyledText fontSize='12px' margin='5px'>
              Q. 서비스 이용 중에 이상한 사람을 만나면 어떡하나요?
            </StyledText>
            <StyledText fontSize='12px'>A. 안전한 서비스 이용을 위해 아래의 조치를 취하고 있습니다.</StyledText>
            <TextContainer>
              <StyledText fontSize='12px'>- 핸드폰 인증을 통한 무분별한 가입 방지</StyledText>
              <StyledText fontSize='12px'>- 신고 기능 기반 사용자 이용 제한 조치</StyledText>
            </TextContainer>
          </FaqCard>
          <FaqCard>
            <StyledText fontSize='12px' margin='5px'>
              Q. 내 정보는 어디에서 수정하나요?
            </StyledText>
            <StyledText fontSize='12px'>A. 회원 정보는 마이페이지 내에서 수정 가능합니다.</StyledText>
          </FaqCard>

          <FaqCard>
            <StyledText fontSize='12px' margin='5px'>
              Q. 소개팅 중 상대가 나가면 어떻게 되나요?
            </StyledText>
            <StyledText fontSize='12px'>
              A. 소개팅 중 한 성별이 모두 퇴장할 시 소개팅은 종료되며, <br />
              얼굴 공개 이전에 종료될 경우 일정 금액을 환불해 드립니다.
            </StyledText>
          </FaqCard>
        </FaqContainer>
      )}
    </ActionButtonContainer>
  );
};

export default ActionButton;
