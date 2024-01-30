import styled from 'styled-components';
import { SimpleInput, ConfirmationCodeInput, PasswordInput } from '../../components/input/Input';
import Button from '../../components/button/Button';
import { useState } from 'react';
import CustomDropdown from '../../components/dropdown/Dropdown';

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
    return (
        <StyledPasswordResetContainer>
            <h2>비밀번호 재설정</h2>
            <StyledPasswordResetInputContainer>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <StyleLabel htmlFor='PasswordReset'>새 비밀번호</StyleLabel>
                    <SimpleInput placeholder='비밀번호 입력' id='PasswordReset' value='' />
                    <PasswordInput placeholder='비밀번호 확인' value={''} />
                </div>
                <Button width="300px" height="50px" borderRadius="10px" backgroundColor='#E1A4B4' fontColor='#FFF'>비밀번호 변경</Button>
            </StyledPasswordResetInputContainer>
        </StyledPasswordResetContainer>
    );
}

export default PasswordReset;
