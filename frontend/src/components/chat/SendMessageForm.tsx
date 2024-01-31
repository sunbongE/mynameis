import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { SimpleInput } from '../input/Input';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import { SendMsg } from '../../config/IconName';

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

const SenderMessageForm = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    console.log('메세지 전송할게요', message);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setMessage(''); // Clear the input value
      handleSendMessage();
    }
  };

  return (
    <StyledMsgFormContainer>
      <SimpleInput placeholder='메세지를 입력하세요' value={message} height='40px' fontsize='12px' onChange={handleMessageChange} onEnterPress={handleEnterPress} />
      <Button backgroundColor='#E1A4B4' width='45px' height='40px' borderRadius='10px' children={<Icon src={SendMsg} />} onButtonClick={handleSendMessage} />
    </StyledMsgFormContainer>
  );
};

export default SenderMessageForm;
