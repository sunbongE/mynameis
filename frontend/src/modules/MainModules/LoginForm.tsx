import React, { useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styled from 'styled-components';

interface loginFormProps {
  loginData: any;
  setLoginData: any;
  loginCheck: any;
  setLoginCheck: any;
  loginOpen: any;
  setLoginOpen: any;
  onLogin: any;
}

const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = (props: loginFormProps) => {
  useEffect(() => {
    if (!props.loginData.user_id) {
      props.setLoginCheck({ ...props.loginCheck, idCheck: '필수 입력 항목입니다.' });
    } else {
      props.setLoginCheck({ ...props.loginCheck, idCheck: '' });
      if (props.loginData.user_id.length > 16) {
        props.setLoginCheck({ ...props.loginCheck, idCheck: '최대 16글자까지 입력 가능합니다.' });
      }
    }
  }, [props.loginData.user_id]);

  useEffect(() => {
    if (!props.loginData.password) {
      props.setLoginCheck({ ...props.loginCheck, passwordCheck: '필수 입력 항목입니다.' });
    } else {
      props.setLoginCheck({ ...props.loginCheck, passwordCheck: '' });
      if (props.loginData.password.length < 9) {
        props.setLoginCheck({ ...props.loginCheck, passwordCheck: '최소 9글자 이상 입력해주세요.' });
      }

      if (props.loginData.password.length > 16) {
        props.setLoginCheck({ ...props.loginCheck, passwordCheck: '최대 16글자까지 입력 가능합니다.' });
      }
    }
  }, [props.loginData.password]);
  return (
    <>
      <StyledTitle>로그인</StyledTitle>
      <Input
        type='text'
        placeholder='아이디 입력'
        value={props.loginData.user_id}
        onChangeInput={(e) => {
          props.setLoginData({ ...props.loginData, user_id: e.target.value });
        }}
      />
      {props.loginCheck.idCheck}
      <Input
        type='password'
        placeholder='비밀번호 입력'
        value={props.loginData.password}
        onChangeInput={(e) => {
          props.setLoginData({ ...props.loginData, password: e.target.value });
        }}
      />
      {props.loginCheck.passwordCheck}
      <ButtonContainer>
        <Button
          onButtonClick={() => {
            props.setLoginOpen(!props.loginOpen);
            props.setLoginData({ user_id: '', password: '' });
          }}
        >
          취소
        </Button>
        <Button onButtonClick={props.onLogin}>로그인</Button>
      </ButtonContainer>
    </>
  );
};
