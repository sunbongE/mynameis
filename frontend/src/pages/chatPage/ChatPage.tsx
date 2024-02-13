import React, { useEffect, useState, Dispatch } from 'react';
import styled from 'styled-components';
import ChatHeader from '../../components/header/ChatHeader';
import MessageList from '../../components/chat/MessageList';
import SenderMessageForm from '../../components/chat/SendMessageForm';

interface ChatProps {
  initialPosition: { x: number; y: number };
  isOpenChat: boolean;
  setIsOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContainer = styled.div<{ top: number; left: number }>`
  margin: 50px;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const ChatPage = ({ initialPosition, isOpenChat, setIsOpenChat }: ChatProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>();
  const [isClickedOutBtn, setIsClickedOutBtn] = useState<boolean>(false);

  useEffect(() => {
    console.log('isClickedOutBtn', isClickedOutBtn);
  }, [isClickedOutBtn]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setDragStart({ x: event.clientX - position.x, y: event.clientY - position.y });
    setIsDragging(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      if (!dragStart) return;

      setPosition({
        x: event.clientX - dragStart.x,
        y: event.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <ChatContainer top={position.y} left={position.x} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <ChatHeader isClickedOutBtn={isClickedOutBtn} setIsClickedOutBtn={setIsClickedOutBtn} />
      <MessageList />
      <SenderMessageForm isOpenChat={isOpenChat} setIsOpenChat={setIsOpenChat} isClickedOut={isClickedOutBtn} />
    </ChatContainer>
  );
};

export default ChatPage;
