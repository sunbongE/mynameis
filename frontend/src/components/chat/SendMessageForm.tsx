import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SimpleInput2 } from '../input/Input';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import { SendMsg } from '../../config/IconName';
import StompJS, { CompatClient, IMessage, Stomp, Message as MessageType } from '@stomp/stompjs';
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
  type: string; // 타입 형식 수정
  roomId: string;
  sender: string;
  msg: string;
}

// interface WebSocketMessage {
//   msg: string;
//   time: string;
//   role: string;
// }

const SenderMessageForm = ({ isOpenChat }: SendMsgFormProps) => {
  const [chatMessages, setChatMessages] = useRecoilState<ChatMessage[]>(chatMessagesState);
  const userInfo: UserInfo | null = useRecoilValue(userInfoState);
  const [coupleId, setCoupleId] = useState<string | null>('1');
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  const socketUrl = 'http://localhost:8080/ws-stomp';
  const client = useRef<CompatClient>();

  useEffect(() => {
    if (userInfo === null) return;
    // setCoupleId(userInfo.coupleId);
    if (coupleId === null) return;

    const sock = new SockJS(socketUrl);
    client.current = Stomp.over(sock); // // SockJS 클라이언트 객체 socket를 STOMP 프로토콜로 오버랩하여 client.current에 할당
    if (client.current === undefined) return;
    console.log('토큰이 있긴하니..?', `Bearer ${Cookies.get('accessToken')}`);
    client.current.connect(
      { 'Authorization ': `Bearer ${Cookies.get('accessToken')}`, 'Content-Type': 'application/json', reconnectDelay: 5000, heartbeatIncoming: 4000, heartbeatOutgoing: 4000 },
      () => {
        client.current?.subscribe(`/sub/chat/room/${coupleId}`, (message: IMessage) => {
          console.log('메세지를 받았어요', message.body);
          const newMessage: WebSocketMessage = JSON.parse(message.body);
          setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      (error: any) => {
        console.log('error: !!!', error);
      },
      { 'Authorization ': `Bearer ${Cookies.get('accessToken')}`, 'Content-Type': 'application/json' }
    );

    if (client.current) {
      console.log('client.current 초기 설정', client.current);
    } else {
      console.log('client.current 초기 설정 연결 안됨.');
    }

    if (client.current.connected) {
      console.log('client.current 초기 설정2', client.current);
    } else {
      console.log('client.current 초기 설정2 연결 안됨.');
    }

    if (isOpenChat) {
      handleEnterMessage();
      console.log('보내졌니????? handleEnterMessage');
    }
  }, [message, isOpenChat]);

  useEffect(() => {});

  const handleMessageChange = (msg: string) => {
    setMessage(msg);
  };

  const handleEnterMessage = () => {
    console.log('들어오긴했어');
    console.log(client, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    if (client) {
      console.log('연결연결');
    }
    // if (!client.current) {
    if (!client.current || !client.current.connected) {
      console.log(client.current, '클라이언트 확인');
      console.error('STOMP client is not connected. 여기야');
      return;
    }
    console.log('전송할 메세지', message);
    if (userInfo === null) return;
    if (userInfo.name === null) return;
    if (coupleId === null) return;

    console.log('sendMessageForm 메세지 전송할게요', message);
    const newMessage: WebSocketMessage = {
      type: 'ENTER',
      roomId: coupleId,
      sender: userInfo.name,
      msg: 'dkfjkd',
    };

    console.log('stompClient!!', client.current);
    if (client.current) {
      client.current.send('/pub/chat/message', { 'Authorization ': `Bearer ${Cookies.get('accessToken')}` }, JSON.stringify(newMessage));
    }
  };

  const handleSendMessage = () => {
    if (!client.current || !client.current.connected) {
      console.error('STOMP client is not connected.');
      return;
    }

    console.log('전송할 메세지', message);
    if (userInfo === null) return;
    if (userInfo.name === null) return;
    if (coupleId === null) return;

    console.log('sendMessageForm 메세지 전송할게요', message);
    const newMessage: WebSocketMessage = {
      type: 'TALK',
      roomId: coupleId,
      sender: userInfo?.name,
      msg: message,
    };
    console.log('!!! ', newMessage);
    setChatMessages([...chatMessages, newMessage]);
    if (client.current) {
      client.current.send('/pub/chat/message', { 'token ': `Bearer ${Cookies.get('accessToken')}` }, JSON.stringify(newMessage));
    }
  };

  const handleEnterPress = (msg: string) => {
    if (!client.current || !client.current.connected) {
      console.error('STOMP client is not connected.');
      return;
    }
    ('');
    if (userInfo === null) return;

    if (userInfo.name === null) return;

    if (coupleId === null) return;

    setMessage(msg);
    console.log('message!!', message);
    const newMessage: WebSocketMessage = {
      type: 'TALK',
      roomId: coupleId,
      sender: userInfo?.name,
      msg: message,
    };
    setChatMessages([...chatMessages, newMessage]);
    if (client.current) {
      client.current.publish({ destination: '/pub/chat/message', body: JSON.stringify(newMessage) });
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
