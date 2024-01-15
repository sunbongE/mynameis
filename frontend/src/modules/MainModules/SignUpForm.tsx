import React, { useEffect } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpProps {
  signUpData: any;
  setSignUpData: React.Dispatch<React.SetStateAction<any>>;
  signUpCheck: any;
  setSignUpCheck: React.Dispatch<React.SetStateAction<any>>;
  signUpOpen: boolean;
  setSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSignUp: () => void;
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

const SignUpForm = (props: SignUpProps) => {
  const { department, position, name, user_id, password, rePassword } = props.signUpData;

  useEffect(() => {
    // 중복아이디 확인 요청
    if (!user_id) {
      props.setSignUpCheck({ ...props.signUpCheck, idCheck: '필수 입력 항목입니다.' });
    } else {
      props.setSignUpCheck({ ...props.signUpCheck, idCheck: '' });
      if (user_id.length > 16) {
        props.setSignUpCheck({ ...props.signUpCheck, idCheck: '최대 16글자까지 입력 가능합니다.' });
      }
    }
  }, [user_id]);

  useEffect(() => {
    if (!password) {
      props.setSignUpCheck({ ...props.signUpCheck, passwordCheck: '필수 입력 항목입니다.' });
    } else {
      props.setSignUpCheck({ ...props.signUpCheck, passwordCheck: '' });
      if (password.length < 9) {
        props.setSignUpCheck({ ...props.signUpCheck, passwordCheck: '최소 9글자 이상 입력해주세요.' });
      } else if (password.length > 16) {
        props.setSignUpCheck({ ...props.signUpCheck, passwordCheck: '최대 16글자까지 입력 가능합니다.' });
      }
    }
  }, [password]);

  useEffect(() => {
    if (password !== rePassword) {
      props.setSignUpCheck({ ...props.signUpCheck, rePasswordCheck: '비밀번호가 일치하지 않습니다.' });
    } else {
      props.setSignUpCheck({ ...props.signUpCheck, rePasswordCheck: '' });
    }
  }, [rePassword]);
  useEffect(() => {}, [rePassword]);
  return (
    <>
      <StyledTitle>회원가입</StyledTitle>
      <Input
        type='text'
        placeholder='아이디 입력'
        value={props.signUpData.user_id}
        onChangeInput={(e) => {
          props.setSignUpData({ ...props.signUpData, user_id: e.target.value });
        }}
      />
      {props.signUpCheck.idCheck}
      <Input
        type='password'
        placeholder='비밀번호 입력'
        value={props.signUpData.password}
        onChangeInput={(e) => {
          props.setSignUpData({ ...props.signUpData, password: e.target.value });
        }}
      />
      {props.signUpCheck.passwordCheck}
      <Input
        type='password'
        placeholder='비밀번호 재입력'
        value={props.signUpData.rePassword}
        onChangeInput={(e) => {
          props.setSignUpData({ ...props.signUpData, rePassword: e.target.value });
        }}
      />
      {props.signUpCheck.rePasswordCheck}
      <Input
        type='text'
        placeholder='이름 입력'
        value={props.signUpData.name}
        onChangeInput={(e) => {
          props.setSignUpData({ ...props.signUpData, name: e.target.value });
        }}
      />
      <Input
        type='text'
        placeholder='소속 입력'
        value={props.signUpData.department}
        onChangeInput={(e) => {
          props.setSignUpData({ ...props.signUpData, department: e.target.value });
        }}
      />
      <Input
        type='text'
        placeholder='직책 입력'
        value={props.signUpData.position}
        onChangeInput={(e) => {
          props.setSignUpData({ ...props.signUpData, position: e.target.value });
        }}
      />
      <ButtonContainer>
        <Button
          onButtonClick={() => {
            props.setSignUpOpen(!props.signUpOpen);
            props.setSignUpData({ department: '', position: '', user_id: '', password: '', name: '', rePassword: '' });
          }}
        >
          취소
        </Button>
        <Button onButtonClick={props.onSignUp}>회원가입</Button>
      </ButtonContainer>
    </>
  );
};

export default SignUpForm;
