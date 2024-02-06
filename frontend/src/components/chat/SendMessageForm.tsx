import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { SimpleInput } from '../input/Input';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import { SendMsg } from '../../config/IconName';

interface SenderMessageFormProp {
  updateMessage: React.Dispatch<React.SetStateAction<string>>;
}

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

const SenderMessageForm = (props: SenderMessageFormProp) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (msg: string) => {
    setMessage(msg);
  };

  const handleSendMessage = () => {
    console.log('sendMessageForm 메세지 전송할게요', message);
    props.updateMessage(message);
    console.log('message', message);
  };

  const handleEnterPress = (msg: string) => {
    setMessage(msg);
    console.log('message!!', message);
  };

  return (
    <StyledMsgFormContainer>
      {/* <SimpleInput2 placeholder='메세지를 입력하세요' value={message} height='40px' fontSize='12px' onInputChange={handleMessageChange} onEnterKeyUp={handleEnterPress} /> */}
      <Button backgroundColor='#E1A4B4' width='45px' height='40px' borderRadius='10px' children={<Icon src={SendMsg} />} onButtonClick={handleSendMessage} />
    </StyledMsgFormContainer>
  );
};

export default SenderMessageForm;
