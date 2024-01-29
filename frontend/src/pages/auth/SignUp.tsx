import styled from "styled-components"
import { SimpleInput, ConfirmationCodeInput, PasswordInput } from "../../components/input/Input"
import Button from "../../components/button/Button"
import { useState } from "react"

const StyledSignUpContainer = styled.div`
    width: 537px;
    height: 2000px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;    
`

const StyledSignUpInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: flex-start;
`

const StyledSignUpText = styled.p`
    color: #B0A9A9;
    font-family: "Plus Jakarta Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`


function SignUp() {
    console.log('회원가입')

    return (
        <StyledSignUpContainer>
            <h1>회원가입</h1>
            <StyledSignUpInputContainer>
                <SimpleInput placeholder="아이디 입력" value='' />
                <SimpleInput placeholder="비밀번호 입력" value='' />
                <ConfirmationCodeInput placeholder="비밀번호 확인" value={""} />

            </StyledSignUpInputContainer>

        </StyledSignUpContainer>
        

    )
}

export default SignUp