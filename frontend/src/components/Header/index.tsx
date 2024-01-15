import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/ssafy-logo.png';

interface HeaderProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  onLoginClick: (value: any) => void;
  onSignUpClick: (value: any) => void;
}

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled.button`
  height: 40px;
`;

const Header = (props: HeaderProps) => {
  const onLogOut = () => {
    // 로그아웃 요청
    localStorage.removeItem('accessToken');
    props.setIsLogin(!props.setIsLogin);
  };

  return (
    <HeaderWrapper>
      <img src={logo} />
      <ButtonWrapper>
        {!props.isLogin && (
          <>
            <StyledButton onClick={props.onSignUpClick}>회원가입</StyledButton>
            <StyledButton onClick={props.onLoginClick}>로그인</StyledButton>
          </>
        )}
        {props.isLogin && <StyledButton onClick={onLogOut}>로그아웃</StyledButton>}
      </ButtonWrapper>
    </HeaderWrapper>
  );
};

export default Header;
