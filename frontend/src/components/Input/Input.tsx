import React, { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { formatTime } from '../../utils/numberUtil';
import { Check_green, Check_red } from '../../config/IconName';
import Icon from '../icon/Icon';

interface InputProps {
  placeholder: string;
  width?: string;
  height?: string;
  isReturn?: boolean | false;
  value: string;
  originValue?: string; // 재확인 전에 사용자가 넘겨주는 비밀번호, 인증코드
  fontSize?: string;
  id?: string;
  onInputChange?: (value: string) => void;
  onEnterKeyUp?: (value: string) => void;
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
  font-size: ${(props) => (props.fontSize ? props.fontSize : `12px`)};
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
  font-family: 'Pretendard Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledConfirmed = styled.div`
  height: 15px;
  display: flex;
  margin-right: 10px;
`;

const SimpleInput = (props: InputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSimpleInputChange = (e: any) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (props.onInputChange) {
      props.onInputChange(newValue);
    }
  };

  const handleEnterKeyPress = (e: any) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      // 엔터 키를 눌렀고, 입력값이 비어있지 않다면 Chip 생성
      // 여기에서는 콜백 함수로 받아온 onEnterKeyUp 함수 호출
      if (props.onEnterKeyUp) {
        props.onEnterKeyUp(inputValue);
        setInputValue(''); // 입력값 초기화
      }
      setInputValue(''); // 입력값 초기화
    }
  };

  return <StyledInput placeholder={props.placeholder} width={props.width} height={props.height} id={props.id} value={inputValue} onChange={handleSimpleInputChange} onKeyUp={handleEnterKeyPress}></StyledInput>;
};

const SimpleInput2 = (props: InputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSimpleInputChange = (e: any) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (props.onInputChange) {
      props.onInputChange(newValue);
    }
    // setInputValue('');
  };

  const handleEnterKeyPress = (e: any) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      // 엔터 키를 눌렀고, 입력값이 비어있지 않다면 Chip 생성
      // 여기에서는 콜백 함수로 받아온 onEnterKeyUp 함수 호출
      if (props.onEnterKeyUp) {
        props.onEnterKeyUp(inputValue);
      }
      setInputValue(''); // 입력값 초기화
    }
  };

  return <StyledInput placeholder={props.placeholder} width={props.width} height={props.height} id={props.id} value={inputValue} onChange={handleSimpleInputChange} onKeyUp={handleEnterKeyPress}></StyledInput>;
};
const ConfirmationCodeInput = (props: InputProps) => {
  const [isReturnMatch, setIsReturnMatch] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleConfirmInputChange = (e: any) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (props.onInputChange) {
      props.onInputChange(newValue);
    }
  };

  const handleEnterKeyPress = (e: any) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      // 엔터 키를 눌렀고, 입력값이 비어있지 않다면 Chip 생성
      // 여기에서는 콜백 함수로 받아온 onEnterKeyUp 함수 호출
      if (props.onEnterKeyUp) {
        props.onEnterKeyUp(inputValue);
      }
      console.log(inputValue);
      setInputValue(inputValue); // 입력값 초기화
    }
  };

  useEffect(() => {
    setIsReturnMatch(props.value === props.originValue);
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
      <StyledInput placeholder={props.placeholder} width={props.width} height={props.height} id={props.id} value={inputValue} onChange={handleConfirmInputChange} onKeyUp={handleEnterKeyPress}></StyledInput>
      <StyledTimer>{formatTime(confirmTime)}</StyledTimer>

      {props.isReturn && (
        <StyledCheckedContainer>
          {isReturnMatch && (
            <>
              <Icon src={Check_green} width='12px' height='12px' marginRight='5px' />
              <StyledCheckText isMatch={isReturnMatch}>인증번호가 일치해요</StyledCheckText>
            </>
          )}
          {!isReturnMatch && (
            <>
              <Icon src={Check_red} width='12px' height='12px' marginRight='5px' />
              <StyledCheckText isMatch={isReturnMatch}>인증번호가 일치하지 않아요</StyledCheckText>
            </>
          )}
        </StyledCheckedContainer>
      )}
    </StyledInputContainer>
  );
};

const PasswordInput = (props: InputProps) => {
  const [isReturnMatch, setIsReturnMatch] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handlePasswordInputChange = (e: any) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (props.onInputChange) {
      props.onInputChange(newValue);
    }
  };

  const handleEnterKeyPress = (e: any) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      // 엔터 키를 눌렀고, 입력값이 비어있지 않다면 Chip 생성
      // 여기에서는 콜백 함수로 받아온 onEnterKeyUp 함수 호출
      if (props.onEnterKeyUp) {
        props.onEnterKeyUp(inputValue);
      }
      console.log(inputValue);
      setInputValue(inputValue); // 입력값 초기화
    }
  };

  useEffect(() => {
    setIsReturnMatch(props.value === props.originValue);
  }, [props.value, props.originValue]);

  // 비밀번호 유효성 검사 추가

  return (
    <StyledInputContainer {...props}>
      <StyledInput
        type='password'
        placeholder={props.placeholder}
        width={props.width}
        height={props.height}
        id={props.id}
        value={inputValue}
        onChange={handlePasswordInputChange}
        onKeyUp={handleEnterKeyPress}
      ></StyledInput>

      {props.isReturn && (
        <StyledCheckedContainer>
          {isReturnMatch && (
            <>
              <Icon src={Check_green} width='8px' height='8px' marginRight='5px' />
              <StyledCheckText isMatch={isReturnMatch}>비밀번호가 일치해요</StyledCheckText>
            </>
          )}
          {!isReturnMatch && (
            <>
              <Icon src={Check_red} width='8px' height='8px' marginRight='5px' />
              <StyledCheckText isMatch={isReturnMatch}>비밀번호가 일치하지 않아요</StyledCheckText>
            </>
          )}
        </StyledCheckedContainer>
      )}
    </StyledInputContainer>
  );
};

export { SimpleInput, SimpleInput2, ConfirmationCodeInput, PasswordInput };
