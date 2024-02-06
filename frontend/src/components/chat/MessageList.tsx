import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ChatMessage } from '../../recoil/atoms/textState';
import { chatMessagesState } from '../../recoil/atoms/textState';
import ReceiverMessage from './ReceiverMessage';
import SenderMessage from './SenderMessage';
import MessageDate from './MessageDate';
import { useEffect } from 'react';

const StyledMsgListContainer = styled.div`
  background: #fff;
  height: 320px;
  width: 320px;
  padding: 10px;
  overflow-y: auto;
`;

const MessageList = () => {
  const [chatMessages, setChatMessages] = useRecoilState<ChatMessage[]>(chatMessagesState);

  useEffect(() => {
    console.log(chatMessages.length);
  }, [chatMessages]); // Removed setChatMessages from dependency array as it causes infinite loop

  return (
    <StyledMsgListContainer>
      {chatMessages.length > 0 && (
        <>
          <MessageDate date='2024.01.31' />
          {chatMessages.map((message, index) =>
            message.role === 'receiver' ? <ReceiverMessage key={index} msg={message.msg} time={message.time} /> : <SenderMessage key={index} msg={message.msg} time={message.time} />
          )}
        </>
      )}
    </StyledMsgListContainer>
  );
};

export default MessageList;
