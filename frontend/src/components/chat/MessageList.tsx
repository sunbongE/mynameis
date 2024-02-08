import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userState';
import { ChatMessage } from '../../recoil/atoms/textState';
import { chatMessagesState } from '../../recoil/atoms/textState';
import ReceiverMessage from './ReceiverMessage';
import SenderMessage from './SenderMessage';
import MessageDate from './MessageDate';
import { useEffect, useRef } from 'react';

const StyledMsgListContainer = styled.div`
  background: #fff;
  height: 320px;
  width: 320px;
  padding: 10px;
  overflow-y: auto;
`;

const MessageList = () => {
  const [chatMessages, setChatMessages] = useRecoilState<ChatMessage[]>(chatMessagesState);
  const userInfo = useRecoilValue(userInfoState);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    console.log(chatMessages.length);
  }, [chatMessages]); // Removed setChatMessages from dependency array as it causes infinite loop

  return (
    <StyledMsgListContainer ref={messagesEndRef}>
      {chatMessages.length > 0 && (
        <>
          {/* <MessageDate date='2024.01.31' /> */}
          {userInfo &&
            chatMessages.map((message, index) => (message.sender === userInfo.userId ? <SenderMessage key={index} msg={message.msg} time={'10:52'} /> : <ReceiverMessage key={index} msg={message.msg} time={'10:52'} />))}
        </>
      )}
    </StyledMsgListContainer>
  );
};

export default MessageList;
