import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import Input from '../../components/Input';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { LoginForm } from '../../modules/MainModules/LoginForm';
import SignUpForm from '../../modules/MainModules/SignUpForm';
import Navigator from '../../components/Navigator';
import { userJoin, userLogin } from '../../apis/services/user/user';

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  border: 2px solid black;
`;

const Main = () => {
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token]);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [loginData, setLoginData] = useState({
    user_id: '',
    password: '',
  });
  const [loginOpen, setLoginOpen] = useState(false);

  const [loginCheck, setLoginCheck] = useState({
    idCheck: '',
    passwordCheck: '',
  });

  const onLogin = async () => {
    if (loginData.user_id && loginCheck.idCheck === '' && loginData.password && loginCheck.passwordCheck === '') {
      // TODO: 로그인 요청 처리
      const params = { id: loginData.user_id, password: loginData.password };
      const response = await userLogin(params);
      // 로그인 요청 처리 성공하면
      if (response.statusCode === 200) {
        alert('로그인 성공!');
        localStorage.setItem('accessToken', response.accessToken);
        setLoginData({ user_id: '', password: '' });
        setIsLogin(true);
        setLoginOpen(!loginOpen);
      }
    }
  };

  const [signUpData, setSignUpData] = useState({
    department: '', // 소속
    position: '', // 직책
    name: '',
    user_id: '',
    password: '',
    rePassword: '',
  });
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signUpCheck, setSignUpCheck] = useState({
    idCheck: '',
    passwordCheck: '',
    rePasswordCheck: '',
    nameCheck: '',
  });

  const onSignUp = async () => {
    if (signUpData.user_id && signUpCheck.idCheck === '' && signUpData.password && signUpCheck.passwordCheck === '' && signUpCheck.rePasswordCheck === '' && signUpData.name && signUpCheck.nameCheck === '') {
      // TODO: 회원가입 요청 처리
      const params = { id: signUpData.user_id, name: signUpData.name, password: signUpData.password, department: signUpData.department, position: signUpData.position };

      const response = await userJoin(params);
      // 회원가입 요청 처리 성공하면
      if (response.statusCode === 200) {
        alert('회원가입 성공!');
        setSignUpData({ department: '', position: '', name: '', user_id: '', password: '', rePassword: '' });
        setSignUpOpen(!signUpOpen);
      }
    }
  };

  return (
    <>
      {loginOpen && (
        <Modal>
          <LoginForm loginData={loginData} setLoginData={setLoginData} loginCheck={loginCheck} setLoginCheck={setLoginCheck} loginOpen={loginOpen} setLoginOpen={setLoginOpen} onLogin={onLogin} />
        </Modal>
      )}

      {signUpOpen && (
        <Modal>
          <SignUpForm signUpData={signUpData} setSignUpData={setSignUpData} signUpCheck={signUpCheck} setSignUpCheck={setSignUpCheck} signUpOpen={signUpOpen} setSignUpOpen={setSignUpOpen} onSignUp={onSignUp} />
        </Modal>
      )}

      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        onLoginClick={() => {
          setLoginOpen(!loginOpen);
        }}
        onSignUpClick={() => {
          setSignUpOpen(!signUpOpen);
        }}
      />
      <MainContainer>
        <Navigator isLogin={isLogin} />
      </MainContainer>
    </>
  );
};

export default Main;
