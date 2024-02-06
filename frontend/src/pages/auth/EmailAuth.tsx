import styled from 'styled-components';
import { SimpleInput, ConfirmationCodeInput, PasswordInput } from '../../components/input/Input';
import Button from '../../components/button/Button';
import { useState } from 'react';
import CustomDropdown from '../../components/dropdown/Dropdown';
import {userEmailAuthentication} from '../../apis/services/user/user'

const StyledEmailContainer = styled.div`
  width: 537px;
  height: 70vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const StyledEmailInputContainer = styled.div`
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

function EmailAuth() {
  const [emailInput, setEmailInput] = useState('');
  const [emailDropdown, setEmailDropdown] = useState('');
  const [emailAuthData, setEmailAuthData] = useState({
    userId: '',
    email: '',
  })


  const handleUserIdChange = (value: string) => {
    setEmailAuthData((prevData) => ({...prevData, userId:value}));
  };

  const handleEmailChange = (value: string) => {
    setEmailInput(value);
    updateEmail(value, emailDropdown)
  };
  
  const handleEmailDropdown = (value: string) => {
    setEmailDropdown(value);
    updateEmail(emailInput, value)
    console.log(emailAuthData)
  };

  const updateEmail = (emailName: string, emailDomain: string) => {
    const emailFull = `${emailName}@${emailDomain}`;
    setEmailAuthData((prevData) => ({...prevData, email:emailFull}))
  };

  const onEmailAuth = async () => {
    console.log(emailAuthData)
    try {
      const response = userEmailAuthentication(emailAuthData)
      console.log('응답', response)
      alert('이메일 인증 성공 : 입럭하신 이메일로 가신 후 링크를 눌러주세요.')
      // if (response) {

      // }

    } catch (error) {
      console.error('이메일 인증 실패', error)
    }

  }



  return (
    <StyledEmailContainer>
      <h2>이메일 인증</h2>

      <StyledEmailInputContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyleLabel htmlFor='ID'>아이디</StyleLabel>
          <SimpleInput placeholder='아이디 입력' id='ID' value={emailAuthData.userId} onInputChange={handleUserIdChange} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyleLabel htmlFor='email'>이메일</StyleLabel>
          <div style={{ display: 'flex' }}>
            <SimpleInput placeholder='이메일 계정' id='email' value={emailInput} width='165px' onInputChange={handleEmailChange} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>@</div>
            <CustomDropdown options={['이메일 선택', 'gmail.com', 'naver.com', 'hanmail.net', 'kakao.com']} width='103px' onSelected={handleEmailDropdown} />
          </div>
        </div>
        <Button width='300px' height='50px' borderRadius='10px' backgroundColor='#E1A4B4' fontColor='#FFF' onButtonClick={onEmailAuth}>
          비밀번호 찾기
        </Button>
      </StyledEmailInputContainer>
    </StyledEmailContainer>
  );
}

export default EmailAuth;
