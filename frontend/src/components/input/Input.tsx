import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatTime } from '../../utils/numberUtil';

interface InputProps {
  placeholder: string;
  width?: number;
  height?: number;
}

const StyledInputContainer = styled.div<InputProps>`
  position: relative;
  width: ${(props) => (props.width ? props.width : `300px`)};
`;

const StyledInput = styled.input<InputProps>`
  border-radius: 10px;
  border: 1px solid #eaeaea;
  background: #fff;
  box-shadow: 0px 10px 40px 0px rgba(174, 174, 174, 0.2);
  height: ${(props) => (props.height ? props.height : `50px`)};
  font-size: 15px;
  padding: 10px;
  width: ${(props) => (props.width ? props.width : `300px`)};

  &:focus {
    border-color: #e1a3b3;
    border-width: 2px;
    outline: none;
  }
`;

const StyledTimer = styled.p`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #f55;
  font-size: 15px;
`;

const SimpleInput = (props: InputProps) => {
  return <StyledInput placeholder={props.placeholder} width={props.width} height={props.height}></StyledInput>;
};
const ConfirmationCodeInput = (props: InputProps) => {
  const [confirmTime, setConfirmTime] = useState(180); // default 3분
  const INTERVAL = 1000;

  useEffect(() => {
    const timer = setInterval(() => {
      setConfirmTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [confirmTime]);

  return (
    <StyledInputContainer {...props}>
      <StyledInput placeholder={props.placeholder} width={props.width} height={props.height}></StyledInput>
      <StyledTimer>{formatTime(confirmTime)}</StyledTimer>
    </StyledInputContainer>
  );
};

export { SimpleInput, ConfirmationCodeInput };
