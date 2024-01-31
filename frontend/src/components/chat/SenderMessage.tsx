import styled from 'styled-components';
import Message from './Message';

interface MessageProps {
  msg: string;
  time: string;
}

const StyledMsgContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin: 8px 0;
`;
const StyledDateContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 5px;
`;
const StyledDate = styled.p`
  color: #333;
  font-family: 'Pretendard Regular';
  font-size: 10px;
  letter-spacing: 0.4px;
`;

const SenderMessage = (props: MessageProps) => {
  return (
    <StyledMsgContainer>
      <StyledDateContainer>
        <StyledDate>{props.time}</StyledDate>
      </StyledDateContainer>
      <Message role='sender' msg={props.msg} />
    </StyledMsgContainer>
  );
};

export default SenderMessage;
