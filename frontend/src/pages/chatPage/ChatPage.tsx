import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChatHeader from '../../components/header/ChatHeader';
import MessageList from '../../components/chat/MessageList';
import SenderMessageForm from '../../components/chat/SendMessageForm';

const ChatContainer = styled.div`
  margin: 50px;
`;

const ChatPage = () => {
  return (
    <ChatContainer>
      <ChatHeader />
      <MessageList />
      <SenderMessageForm />
    </ChatContainer>
  );
};

export default ChatPage;
