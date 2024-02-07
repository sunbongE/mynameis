import styled from 'styled-components';
import { SimpleInput, ConfirmationCodeInput, PasswordInput } from '../../components/input/Input';
import Button from '../../components/button/Button';
import { useState } from 'react';
import { getUserInfo, userLogin } from '../../apis/services/user/user';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { TokenAtom } from '../../recoil/atoms/userAuthAtom';
import { userInfoState } from '../../recoil/atoms/userState';
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
  cursor: pointer;
`;

function Login() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useRecoilState(TokenAtom);
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

  const [user, setUser] = useRecoilState(userInfoState)

  const onLogin = async () => {
    try {
      // console.log('logindata', loginData);
      const response = await userLogin(loginData);
      console.log('response.data : ', response);

      if (response.token) {
        // 리코일 토큰 저장 및 관리
        setAccessToken(response.token);
        // 프론트에서 토큰 쿠키 저장 : name, value, 만료기한
        Cookies.set('accessToken', response.token, { expires: 7 });
        
        if (Cookies.get('accessToken')) {
          const userInfo = await getUserInfo();
          setUser(userInfo);
          
          console.log('userInfo (after setUser) ', userInfo);
          console.log('로그인 성공');
        }
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
          <PasswordInput placeholder='비밀번호' value={loginData.password} onInputChange={handlePasswordChange} onEnterKeyUp={onLogin} />
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
