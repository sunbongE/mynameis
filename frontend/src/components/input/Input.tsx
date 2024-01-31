import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatTime } from '../../utils/numberUtil';
import { Check_green, Check_red } from '../../config/IconName';
import Icon from '../icon/Icon';

interface InputProps {
  placeholder: string;
  width?: number;
  height?: number;
  isReturn?: boolean | false;
  value: string;
  originValue?: string; // 재확인 전에 사용자가 넘겨주는 비밀번호, 인증코드
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

const StyledCheckedContainer = styled.div`
  display: flex;
  column-gap: 3px;
`;

const StyledCheckText = styled.p<{ isMatch: boolean }>`
  color: ${(props) => (props.isMatch ? '#3da591' : '#EF3E5C')};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SimpleInput = (props: InputProps) => {
  return <StyledInput placeholder={props.placeholder} width={props.width} height={props.height} value={props.value}></StyledInput>;
};

const ConfirmationCodeInput = (props: InputProps) => {
  const [isReturnMatch, setIsReturnMath] = useState(false);
  useEffect(() => {
    setIsReturnMath(props.value === props.originValue);
  }, [props.value, props.originValue]);

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
      <StyledInput placeholder={props.placeholder} width={props.width} height={props.height} value={props.value}></StyledInput>
      <StyledTimer>{formatTime(confirmTime)}</StyledTimer>

      {props.isReturn && (
        <StyledCheckedContainer>
          {isReturnMatch && (
            <>
              <Icon src={Check_green} width='12px' />
              <StyledCheckText isMatch={isReturnMatch}>인증번호가 일치해요</StyledCheckText>
            </>
          )}
          {!isReturnMatch && (
            <>
              <Icon src={Check_red} width='12px' />
              <StyledCheckText isMatch={isReturnMatch}>인증번호가 일치하지 않아요</StyledCheckText>
            </>
          )}
        </StyledCheckedContainer>
      )}
    </StyledInputContainer>
  );
};

const PasswordInput = (props: InputProps) => {
  const [isReturnMatch, setIsReturnMath] = useState(false);

  useEffect(() => {
    setIsReturnMath(props.value === props.originValue);
  }, [props.value, props.originValue]);

  // 비밀번호 유효성 검사 추가

  return (
    <StyledInputContainer {...props}>
      <StyledInput type='password' placeholder={props.placeholder} width={props.width} height={props.height} value={props.value}></StyledInput>

      {props.isReturn && (
        <StyledCheckedContainer>
          {isReturnMatch && (
            <>
              <Icon src={Check_green} width='12px' />
              <StyledCheckText isMatch={isReturnMatch}>비밀번호가 일치해요</StyledCheckText>
            </>
          )}
          {!isReturnMatch && (
            <>
              <Icon src={Check_red} width='12px' />
              <StyledCheckText isMatch={isReturnMatch}>비밀번호가 일치하지 않아요</StyledCheckText>
            </>
          )}
        </StyledCheckedContainer>
      )}
    </StyledInputContainer>
  );
};

export { SimpleInput, ConfirmationCodeInput, PasswordInput };
