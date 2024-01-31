import styled from 'styled-components';
import Message from './Message';

interface MessageProps {
  msg: string;
  time: string;
}

const StyledMsgContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 8px 0;
`;
const StyledDateContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 5px;
`;
const StyledDate = styled.p`
  color: #333;
  font-family: 'Pretendard Regular';
  font-size: 10px;
  letter-spacing: 0.4px;
`;

const ReceiverMessage = (props: MessageProps) => {
  return (
    <StyledMsgContainer>
      <Message role='receiver' msg={props.msg} />
      <StyledDateContainer>
        <StyledDate>{props.time}</StyledDate>
      </StyledDateContainer>
    </StyledMsgContainer>
  );
};

export default ReceiverMessage;
