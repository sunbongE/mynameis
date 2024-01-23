import React from 'react';
import styled from 'styled-components';
import Logo from '../icon/Logo';
import Icon from '../icon/Icon';
import { Bell } from '../../config/IconName';
const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  background-color: #232323;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftContents = styled.div``;
const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      <LeftContents>
        <Icon src={Bell} />
        {/* 로그인, 회원가입 */}
      </LeftContents>
    </HeaderContainer>
  );
};

export default Header;
