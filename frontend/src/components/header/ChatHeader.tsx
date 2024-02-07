import styled from 'styled-components';
import Icon from '../icon/Icon';
import { Out, Blink, Video } from '../../config/IconName';

interface ChatHeaderProps {
  isClickedOutBtn: boolean;
  setIsClickedOutBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledHeaderContainer = styled.div`
  width: 320px;
  height: 50px;
  border-radius: 15px 15px 0px 0px;
  background: #e1a4b4;
  box-shadow: 0px 4px 4px 0px rgba(243, 219, 225, 0.25);
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const StyledHeaderLeft = styled.div`
  display: flex;
  column-gap: 10px;
`;
const StyledHeaderRight = styled.div`
  display: flex;
  column-gap: 15px;
`;

const StyledReceiverContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledReceiver = styled.p`
  color: #fffefe;
  font-family: 'Pretendard Regular';
  font-size: 15px;
  letter-spacing: 0.5px;
`;

const StyledOutContainer = styled.div``;
const ChatHeader = ({ setIsClickedOutBtn, isClickedOutBtn }: ChatHeaderProps) => {
  const handleClickOutBtn = () => {
    setIsClickedOutBtn(!isClickedOutBtn);
  };
  return (
    <StyledHeaderContainer>
      <StyledHeaderLeft>
        <Icon src={Blink} />
        <StyledReceiverContainer>
          <StyledReceiver>집 가고 싶어요</StyledReceiver>
        </StyledReceiverContainer>
      </StyledHeaderLeft>

      <StyledHeaderRight>
        <Icon src={Video} width='20px' />
        <StyledOutContainer onClick={handleClickOutBtn}>
          <Icon src={Out} width='20px' />
        </StyledOutContainer>
      </StyledHeaderRight>
    </StyledHeaderContainer>
  );
};

export default ChatHeader;
