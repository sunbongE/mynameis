import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SimpleInput2 } from '../input/Input';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import { SendMsg } from '../../config/IconName';
import { Client, IMessage } from '@stomp/stompjs';
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

interface WebSocketMessage {
  type: string;
  roomId: string;
  sender: string;
  msg: string;
}

// interface WebSocketMessage {
//   msg: string;
//   time: string;
//   role: string;
// }

const SenderMessageForm = () => {
  const [chatMessages, setChatMessages] = useRecoilState<ChatMessage[]>(chatMessagesState);
  const userInfo: UserInfo | null = useRecoilValue(userInfoState);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const socketUrl = 'http://localhost:8080/ws-stomp';

  useEffect(() => {
    if (userInfo === null) return;
    if (userInfo.coupleId === null) return;

    const sock = new SockJS(socketUrl);
    const client = new Client({
      brokerURL: socketUrl,
      webSocketFactory: () => sock,
      onConnect: () => {
        setStompClient(client);
        client.subscribe(`/sub/chat/room/${userInfo?.coupleId}`, (message: IMessage) => {
          console.log('메세지를 받았어요', message.body);
          const newMessage: WebSocketMessage = JSON.parse(message.body);
          setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },

      connectHeaders: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    });

    client.activate();
  }, []);

  const handleMessageChange = (msg: string) => {
    setMessage(msg);
  };

  const handleSendMessage = () => {
    if (userInfo === null) return;
    if (userInfo.name === null) return;
    if (userInfo.coupleId === null) return;

    console.log('sendMessageForm 메세지 전송할게요', message);
    const newMessage: WebSocketMessage = {
      type: 'TALK',
      roomId: userInfo.coupleId,
      sender: userInfo?.name,
      msg: message,
    };
    setChatMessages([...chatMessages, newMessage]);
    if (stompClient) {
      stompClient.publish({ destination: '/pub/chat/message', body: JSON.stringify(newMessage) });
    }
  };

  const handleEnterPress = (msg: string) => {
    if (userInfo === null) return;
    if (userInfo.name === null) return;
    if (userInfo.coupleId === null) return;

    setMessage(msg);
    console.log('message!!', message);
    const newMessage: WebSocketMessage = {
      type: 'TALK',
      roomId: userInfo.coupleId,
      sender: userInfo?.name,
      msg: message,
    };
    setChatMessages([...chatMessages, newMessage]);
    if (stompClient) {
      stompClient.publish({ destination: '/pub/chat/message', body: JSON.stringify(newMessage) });
    }
  };

  return (
    <StyledMsgFormContainer>
      <SimpleInput2 placeholder='메세지를 입력하세요' value={message} height='40px' fontSize='12px' onInputChange={handleMessageChange} onEnterKeyUp={handleEnterPress} />
      <Button backgroundColor='#E1A4B4' width='45px' height='40px' borderRadius='10px' children={<Icon src={SendMsg} />} onButtonClick={handleSendMessage} />
    </StyledMsgFormContainer>
  );
};

export default SenderMessageForm;
