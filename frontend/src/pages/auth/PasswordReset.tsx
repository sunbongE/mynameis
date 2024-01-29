import styled from "styled-components"
import { SimpleInput, ConfirmationCodeInput, PasswordInput } from "../../components/input/Input"
import Button from "../../components/button/Button"
import { useState } from "react"

const StyledLoginContainer = styled.div`
    width: 537px;
    height: 70vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
`

const StyledLoginInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: flex-start;
`

const StyledLoginText = styled.p`
    color: #B0A9A9;
    font-family: "Plus Jakarta Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

function PasswordReset() {


    return (
        <StyledLoginContainer>
            <h2>비밀번호 재설정</h2>

            <StyledLoginInputContainer>
                <SimpleInput placeholder="아이디" value='' />
                <SimpleInput placeholder="비밀번호" value='' />
                <StyledLoginText>비밀번호를 잊어버리셨나요?</StyledLoginText>
                <Button width="300px" height="50px" borderRadius="10px" backgroundColor='#E1A4B4' fontColor='#FFF' fontSize='12px' >로그인</Button>
            </StyledLoginInputContainer>
            <StyledLoginText>계정이 없으신가요? 회원가입하러 가기</StyledLoginText>

        </StyledLoginContainer>
    )
}

export default PasswordReset