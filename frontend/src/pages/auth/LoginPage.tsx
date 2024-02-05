import styled from 'styled-components';
import { SimpleInput, ConfirmationCodeInput, PasswordInput } from '../../components/input/Input';
import Button from '../../components/button/Button';
import { useState } from 'react';
import { userLogin } from '../../apis/services/user/user';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { IsLoginAtom, TokenAtom } from '../../recoil/atoms/userAuthAtom';

const StyledLoginContainer = styled.div`
  width: 537px;
  height: 70vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const StyledLoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: flex-start;
`;

const StyledLoginText = styled.p`
  color: #b0a9a9;
  font-family: 'Plus Jakarta Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function Login() {
  const navigate = useNavigate();
  const [AccessToken, setAccessToken] = useRecoilState(TokenAtom);
  const [isLogin, setIsLogin] = useRecoilState(IsLoginAtom);
  const [loginData, setLoginData] = useState({
    userId: '',
    password: '',
  });

  const handleUserIdChange = (value: string) => {
    setLoginData((prevData) => ({ ...prevData, userId: value }));
  };

  const handlePasswordChange = (value: string) => {
    setLoginData((prevData) => ({ ...prevData, password: value }));
  };

  const goToEmailAuth = () => {
    navigate('/EmailAuth');
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  const onLogin = async () => {
    try {
      const response = await userLogin(loginData);
      const accessToken = response.refreshToken;

      // 프론트에서 토큰 쿠키 저장 : name, value, 만료기한
      if (accessToken) {
        Cookies.set('accessToken', accessToken);
        console.log('로그인 성공');
        setIsLogin(true);
      }
      navigate('/');
    } catch (error) {
      console.log('로그인 실패', error);
      alert('로그인이 실패했습니다.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <StyledLoginContainer>
        <h2>로그인</h2>
        <StyledLoginInputContainer>
          <SimpleInput placeholder='아이디' value={loginData.userId} onInputChange={handleUserIdChange} />
          <SimpleInput placeholder='비밀번호' value={loginData.password} onInputChange={handlePasswordChange} />
          <StyledLoginText onClick={goToEmailAuth}>비밀번호를 잊어버리셨나요?</StyledLoginText>
          <Button width='300px' height='50px' borderRadius='10px' backgroundColor='#E1A4B4' fontColor='#FFF' onButtonClick={onLogin}>
            로그인
          </Button>
        </StyledLoginInputContainer>
        <StyledLoginText onClick={goToSignUp}>계정이 없으신가요? 회원가입하러 가기</StyledLoginText>
      </StyledLoginContainer>
    </div>
  );
}

export default Login;
