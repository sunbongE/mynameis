import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SimpleInput2 } from '../input/Input';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import { SendMsg } from '../../config/IconName';
import StompJS, { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ChatMessage } from '../../recoil/atoms/textState';
import { chatMessagesState } from '../../recoil/atoms/textState';
import { userInfoState, UserInfo } from '../../recoil/atoms/userState';
import Cookies from 'js-cookie';

const StyledMsgFormContainer = styled.div`
  width: 320px;
  padding: 5px;
  display: flex;
  column-gap: 5px;
  border-radius: 0px 0px 15px 15px;
  border-top: 1px solid #f3dbe1;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(243, 219, 225, 0.25);
`;

interface SendMsgFormProps {
  isOpenChat: boolean;
}

interface WebSocketMessage {
  type: string;
  roomId: string;
  sender: string;
  msg: string;
}

const SenderMessageForm = ({ isOpenChat }: SendMsgFormProps) => {
  const [chatMessages, setChatMessages] = useRecoilState<ChatMessage[]>(chatMessagesState);
  const userInfo: UserInfo | null = useRecoilValue(userInfoState);
  const [coupleId, setCoupleId] = useState<string | null>('1');
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  const socketUrl = 'http://localhost:8080/ws-stomp';
  let isFirstConnect = true; // 처음 방에 들어갈 때인지 판단하려고 > disconnect 할 때 true 다시 만들어줘.
  useEffect(() => {
    if (userInfo === null || coupleId === null) return;

    const sock = new SockJS(socketUrl);
    const stompClient = Stomp.over(sock);
    setStompClient(stompClient);

    stompClient.connect(
      { Authorization: `Bearer ${Cookies.get('accessToken')}`, 'Content-Type': 'application/json', reconnectDelay: 5000, heartbeatIncoming: 4000, heartbeatOutgoing: 4000 },
      () => {
        stompClient.subscribe(`/sub/chat/room/${coupleId}`, (message: IMessage) => {
          const newMessage: WebSocketMessage = JSON.parse(message.body);
          setChatMessages((prevMessages) => [...prevMessages, newMessage]);

          if (isFirstConnect) {
            handleEnterChat();
            isFirstConnect = false;
          }
        });
      },
      (error: any) => {
        console.log('stompClient connect error:', error);
      }
    );
  }, [userInfo, coupleId]);

  const handleEnterChat = () => {
    console.log('handleEnterChat 채팅방에 들어왔습니다.');
    if (!stompClient || !stompClient.connected) {
      console.error('handleEnterChat : STOMP client is not connected.');
      return;
    }

    if (!userInfo || !userInfo.name || !coupleId) return;

    const newMessage: WebSocketMessage = {
      type: 'ENTER',
      roomId: coupleId,
      sender: userInfo.name,
      msg: '',
    };

    stompClient.send('/pub/chat/message', { Authorization: `Bearer ${Cookies.get('accessToken')}` }, JSON.stringify(newMessage));
  };

  const handleMessageChange = (msg: string) => {
    setMessage(msg);
  };

  const handleSendMessage = () => {
    console.log('handleSendMessage 메세지를 보냈습니다.');
    if (!stompClient || !stompClient.connected) {
      console.error('handleSendMessage : STOMP client is not connected.');
      return;
    }

    if (!userInfo || !userInfo.name || !coupleId) return;

    const newMessage: WebSocketMessage = {
      type: 'TALK',
      roomId: coupleId,
      sender: userInfo.name,
      msg: message,
    };

    setChatMessages([...chatMessages, newMessage]);
    stompClient.send('/pub/chat/message', { Authorization: `Bearer ${Cookies.get('accessToken')}` }, JSON.stringify(newMessage));
    setMessage('');
  };

  const handleEnterPress = (msg: string) => {
    console.log('handleEnterPress 엔터키를 눌러 메세지를 보냈습니다.');
    if (!stompClient || !stompClient.connected) {
      console.error('handleEnterPress : STOMP client is not connected.');
      return;
    }

    if (!userInfo || !userInfo.name || !coupleId) return;

    setMessage(msg);

    const newMessage: WebSocketMessage = {
      type: 'TALK',
      roomId: coupleId,
      sender: userInfo.name,
      msg: message,
    };

    setChatMessages([...chatMessages, newMessage]);
    stompClient.send('/pub/chat/message', { Authorization: `Bearer ${Cookies.get('accessToken')}` }, JSON.stringify(newMessage));
  };

  return (
    <StyledMsgFormContainer>
      <SimpleInput2 placeholder='메세지를 입력하세요' value={message} height='40px' fontSize='12px' onInputChange={handleMessageChange} onEnterKeyUp={handleEnterPress} />
      <Button backgroundColor='#E1A4B4' width='45px' height='40px' borderRadius='10px' children={<Icon src={SendMsg} />} onButtonClick={handleSendMessage} />
    </StyledMsgFormContainer>
  );
};

export default SenderMessageForm;
