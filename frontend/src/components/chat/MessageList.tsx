import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userState';
import { ChatMessage } from '../../recoil/atoms/textState';
import { chatMessagesState } from '../../recoil/atoms/textState';
import ReceiverMessage from './ReceiverMessage';
import SenderMessage from './SenderMessage';
import MessageDate from './MessageDate';
import { getMessages } from '../../apis/services/chatting/chatting';
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
    console.log('출력할 ', chatMessages);
  }, [chatMessages]); // Removed setChatMessages from dependency array as it causes infinite loop

  // 스크롤이 메세지 위에 도달했을 때 이전 메세지 불러오기
  const handleScroll = async () => {
    if (messagesEndRef.current) {
      const scrollTop = messagesEndRef.current.scrollTop;
      if (scrollTop === 0) {
        console.log('스크롤 위', scrollTop);

        // 채팅방 메세지 불러오기 > 수정
        console.log('현재 가지고 있는 메세지 수', chatMessages.length);
        const loadedMessages = await getMessages(chatMessages.length);
        console.log('messages 받아왔어요', loadedMessages);
        // const filteredData = loadedMessages.filter((item: any) => item.type !== 'ENTER').reverse();
        // console.log('filteredData', filteredData);
        const reversedLoadedMessages = loadedMessages.reverse();
        console.log('reversed', reversedLoadedMessages);
        setChatMessages((prevMessages) => [...reversedLoadedMessages, ...prevMessages]);
      }
    }
  };
  return (
    <StyledMsgListContainer ref={messagesEndRef} onScroll={handleScroll}>
      {chatMessages.length > 0 && (
        <>
          {/* <MessageDate date='2024.01.31' /> */}
          {userInfo &&
            chatMessages
              .filter((item: any) => item.type !== 'ENTER')
              .map((message, index) => (message.sender === userInfo.userId ? <SenderMessage key={index} msg={message.msg} time={'10:52'} /> : <ReceiverMessage key={index} msg={message.msg} time={'10:52'} />))}
        </>
      )}
    </StyledMsgListContainer>
  );
};

export default MessageList;
