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
import { getMessages } from '../../apis/services/chatting/chatting';
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
  isClickedOut: boolean;
  setIsOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}

interface WebSocketMessage {
  type: string;
  roomId: string;
  sender: string;
  msg: string;
  date: string;
}

const SenderMessageForm = ({ isOpenChat, isClickedOut, setIsOpenChat }: SendMsgFormProps) => {
  const [chatMessages, setChatMessages] = useRecoilState<ChatMessage[]>(chatMessagesState);
  const userInfo: UserInfo | null = useRecoilValue(userInfoState);
  const [coupleId, setCoupleId] = useState<string | null>('1');
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  const [isOut, setIsOut] = useState<boolean>(false);

  const socketUrl = 'http://localhost:8080/ws-stomp';
  const [isFirstConnect, setIsFirstConnect] = useState<boolean>(true); // 처음 방에 들어갈 때인지 판단하려고 > disconnect 할 때 true 다시 만들어줘.

  useEffect(() => {
    if (userInfo === null || coupleId === null) return;

    const sock = new SockJS(socketUrl);
    const stompClient = Stomp.over(sock);
    setStompClient(stompClient);
    stompClient.connect(
      { Authorization: `Bearer ${Cookies.get('accessToken')}`, 'Content-Type': 'application/json', reconnectDelay: 5000, heartbeatIncoming: 4000, heartbeatOutgoing: 4000 },
      () => {
        console.log('subscribe 전');
        console.log(coupleId, '커플아이디');
        stompClient.subscribe(`/sub/chat/1`, (message: any) => {
          console.log('subscribe 후');
          const newMessage: WebSocketMessage = JSON.parse(message.body);
          setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      (error: any) => {
        console.log('stompClient connect error:', error);
      }
    );
    return () => {
      disconnect();
    };
  }, [userInfo, coupleId]);

  useEffect(() => {
    if (!stompClient || !stompClient.connected) return;
    if (isFirstConnect) {
      console.log('!!! 들어왔ㄴ어??? firstconnect');
      handleEnterChat();
      setIsFirstConnect(false);
    }
  }, [stompClient, stompClient?.connected]);

  useEffect(() => {
    if (!stompClient) return;
    if (isOut !== isClickedOut) {
      console.log('방을 나가겠습니다');
      disconnect();
      setIsOut(isClickedOut);
    }
  }, [isClickedOut]);

  const disconnect = () => {
    if (!stompClient) return;
    stompClient.disconnect();
    setIsOpenChat(false);
    setIsFirstConnect(true);
    console.log('연결을 종료합니다. ', 'isOpenChat', isOpenChat, 'isFirstConnect', isFirstConnect);
  };
  // 채팅방 접속
  const handleEnterChat = async () => {
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
      date: '',
    };
    stompClient.send('/pub/chat/message', { Authorization: `Bearer ${Cookies.get('accessToken')}` }, JSON.stringify(newMessage));

    // 채팅방 메세지 불러오기
    console.log('현재 가지고 있는 메세지 수', chatMessages.length);
    const loadedMessages = await getMessages(chatMessages.length);
    // console.log('messages 받아왔어요', loadedMessages.reverse());
    // const filteredData = loadedMessages.filter((item: any) => item.type !== 'ENTER').reverse();
    // console.log('filteredData', filteredData);
    const reversedLoadedMessages = loadedMessages.reverse();
    console.log('reversed', reversedLoadedMessages);
    setChatMessages(reversedLoadedMessages);
  };

  const handleMessageChange = (msg: string) => {
    setMessage(msg);
  };

  // 메세지 전송 버튼 눌렀을 때
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
      date: '',
    };

    stompClient.send('/pub/chat/message', { Authorization: `Bearer ${Cookies.get('accessToken')}` }, JSON.stringify(newMessage));
    setMessage('');
  };

  // enter key 눌렀을 때
  const handleEnterPress = (msg: string) => {
    console.log('handleEnterPress 엔터키를 눌러 메세지를 보냈습니다.');
    if (!stompClient || !stompClient.connected) {
      console.error('handleEnterPress : STOMP client is not connected.');
      return;
    }

    if (!userInfo || !userInfo.name || !coupleId) return;

    const newMessage: WebSocketMessage = {
      type: 'TALK',
      roomId: coupleId,
      sender: userInfo.name,
      msg: msg,
      date: '',
    };

    stompClient.send('/pub/chat/message', { Authorization: `Bearer ${Cookies.get('accessToken')}` }, JSON.stringify(newMessage));
    setMessage('');
  };

  return (
    <StyledMsgFormContainer>
      <SimpleInput2 placeholder='메세지를 입력하세요' value={message} height='40px' fontSize='12px' onInputChange={handleMessageChange} onEnterKeyUp={handleEnterPress} />
      <Button backgroundColor='#E1A4B4' width='45px' height='40px' borderRadius='10px' children={<Icon src={SendMsg} />} onButtonClick={handleSendMessage} />
    </StyledMsgFormContainer>
  );
};

export default SenderMessageForm;
