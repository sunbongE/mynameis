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
          handleEnterChat();
        });
      },
      (error: any) => {
        console.log('error:', error);
      }
    );

    console.log('방 입장');
  }, [userInfo, coupleId]);

  const handleEnterChat = () => {
    if (!stompClient || !stompClient.connected) {
      console.error('STOMP client is not connected.');
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
    if (!stompClient || !stompClient.connected) {
      console.error('STOMP client is not connected.');
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
  };

  const handleEnterPress = (msg: string) => {
    if (!stompClient || !stompClient.connected) {
      console.error('STOMP client is not connected.');
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
