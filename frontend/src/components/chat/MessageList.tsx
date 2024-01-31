import styled from 'styled-components';
import ReceiverMessage from './ReceiverMessage';
import SenderMessage from './SenderMessage';
import MessageDate from './MessageDate';

const StyledMsgListContainer = styled.div`
  background: #fff;
  height: 300px;
  width: 320px;
  padding: 10px;
  overflow-y: auto;
`;

const MessageList = () => {
  return (
    <StyledMsgListContainer>
      <ReceiverMessage msg='안녕' time='10:35' />
      <ReceiverMessage msg='안녕' time='10:35' />
      <ReceiverMessage msg='안녕' time='10:35' />
      <MessageDate date='2024.01.31' />
      <SenderMessage msg='안녕안녕안녕안녕안녕' time='10:36' />
      <SenderMessage msg='안녕안녕' time='10:36' />
      <SenderMessage msg='안녕안녕' time='10:36' />
    </StyledMsgListContainer>
  );
};

export default MessageList;
