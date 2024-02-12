import styled from 'styled-components';
import { SimpleInput, ConfirmationCodeInput, PasswordInput } from '../../components/input/Input';
import Button from '../../components/button/Button';
import { useState } from 'react';
import CustomDropdown from '../../components/dropdown/Dropdown';
import { userPasswordReset } from '../../apis/services/user/user';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import { isLoginSelector } from '../../recoil/selectors/isLoginSelector';
import Header from '../../components/header/Header';
import { useRecoilValue, useRecoilCallback } from 'recoil';


const StyledPasswordResetContainer = styled.div`
  width: 537px;
  height: 70vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const StyledPasswordResetInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;

  color: #b0a9a9;
  font-family: 'Plus Jakarta Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyleLabel = styled.label`
  color: #b0a9a9;
  font-family: 'Plus Jakarta Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function PasswordReset() {
  const isLogin = useRecoilValue(isLoginSelector);
  const setLoginState = useRecoilCallback(({ set }) => (newValue: boolean) => {
    set(isLoginSelector, newValue);
  });

  const handleLogin = () => {
    console.log('로그인');
    navigate('/login');
  };

  const handleLogout = () => {
    console.log('로그아웃');
    setMyPageOpen(false);
    setLoginState(false);
    alert('로그아웃 되었습니다.');
    window.location.reload();
  };

  const handleSignUp = () => {
    console.log('회원가입');
    navigate('/signup');
  };

  const [myPageOpen, setMyPageOpen] = useState<boolean>(false);

  const handleMyPage = () => {
    setMyPageOpen(!myPageOpen);
  };

  const [coinOpen, setCoinOpen] = useState<boolean>(false);
  const handleCoinPage = () => {
    setCoinOpen(!coinOpen);
  };

  const [scrolling, setScrolling] = useState<boolean>(false);

  const [newPasswordData, setNewPasswordData] = useState({
    password: '',
  })
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setnewPasswordConfirm] = useState('')
  const navigate = useNavigate();

  const handleNewPasswordChange = (value:string) => {
    setNewPassword(value)
    setNewPasswordData((prevData) => ({...prevData, password:value}))
    console.log(value)
  }
  
  const handleNewPasswordConfirmChange = (value:string) => {
    setnewPasswordConfirm(value)
  }
  
  const query = window.location.search
  const onPasswordReset = async () => {
    console.log('뉴패스워드 : ',newPasswordData, query)
    try {
      const response = userPasswordReset(newPasswordData, query)
      console.log('응답 :',response)
      alert('비밀번호가 변경되었습니다. 새로운 비밀번호로 로그인 해주세요')
      navigate('/login')
    } catch (error) {
      console.error('비밀번호 변경 실패')
    }
  } 


    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Header
        isLogin={isLogin}
        onClickLogin={handleLogin}
        onClickLogout={handleLogout}
        onClickSignUp={handleSignUp}
        onClickMyPage={handleMyPage}
        isMyPageOpen={myPageOpen}
        onCoinClick={handleCoinPage}
        isCoinPageOpen={coinOpen}
        showHeader={scrolling}
      />
        <StyledPasswordResetContainer>
            <h2>비밀번호 재설정</h2>
            <StyledPasswordResetInputContainer>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <StyleLabel htmlFor='PasswordReset'>새 비밀번호</StyleLabel>
                    <SimpleInput placeholder='비밀번호 입력' id='PasswordReset' value={newPasswordData.password} onInputChange={handleNewPasswordChange} />
                    <PasswordInput placeholder='비밀번호 확인' value={newPasswordConfirm} onInputChange={handleNewPasswordConfirmChange} isReturn={true} originValue={newPassword} />
                </div>
                <Button width="300px" height="50px" borderRadius="10px" backgroundColor='#E1A4B4' fontColor='#FFF' onButtonClick={onPasswordReset}>비밀번호 변경</Button>
            </StyledPasswordResetInputContainer>
        </StyledPasswordResetContainer>
        <Footer/>
      </div>
    );
}

export default PasswordReset;
