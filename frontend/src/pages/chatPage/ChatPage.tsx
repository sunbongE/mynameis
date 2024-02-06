import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChatHeader from '../../components/header/ChatHeader';
import MessageList from '../../components/chat/MessageList';
import SenderMessageForm from '../../components/chat/SendMessageForm';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatContainer = styled.div`
  margin: 50px;
`;

/**
 * 1. 서버와 연결할 클라이언트 객체 생성
 * 2. 메세지 전송 전 subscriber와 publisher 지정
 * 3. subscribe를 하면 해당 url로 나에게 메세지를 보낼 수 있는 경로가 생김
 * 4. publisher를 하면 publish한 url로 메세지가 이동
 */
let stompclient;
const connect = () => {
  let sock = new SockJS('');
  const client = new Client({
    brokerURL: '',
    onConnect: () => {
      client.subscribe('/sub', (message) => {
        console.log(message.body);
      });
      client.publish({ destination: '/pub', body: 'first message' });
    }, // 연결될 때
  });
};
const ChatPage = () => {
  const [newMessage, setNewMessage] = useState('');
  // const handleMessage = (message: string) => {
  //   setNewMessage(message);
  //   console.log('새로운 메세지', message);
  // };

  useEffect(() => {
    console.log('새로운 메세지가 도착했어요', newMessage);
  }, [newMessage]);
  return (
    <ChatContainer>
      <ChatHeader />
      <MessageList />
      <SenderMessageForm updateMessage={setNewMessage} />
    </ChatContainer>
  );
};

export default ChatPage;
