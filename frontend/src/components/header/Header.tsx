import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../icon/Logo';
import Icon from '../icon/Icon';
import { Bell, Coin } from '../../config/IconName';
import Button from '../button/Button';
import { addCommaInNumber } from '../../utils/numberUtil';
import MyPageCard from '../myPageCard/MyPageCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userState';
import CoinList from '../coinListItem/CoinList';

interface HeaderProps {
  isLogin: boolean;
  isMyPageOpen: boolean;
  isCoinPageOpen: boolean;
  showHeader: boolean;
  setIsLogin?: React.Dispatch<React.SetStateAction<boolean>>;
  onClickLogin: () => void;
  onClickLogout: () => void;
  onClickSignUp: () => void;
  onClickMyPage: () => void;
  onCoinClick: () => void;
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
`;

const LeftContents = styled.div`
  display: flex;
  align-items: center;
  column-gap: 24px;
`;

const StyledPointContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 3px;
`;

const StyledPoint = styled.p`
  color: #e1a3b3;
  font-family: 'Pretendard SemiBold';
`;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
const Header = (props: HeaderProps) => {
  // const isLogin = useRecoilValue(isLoginSelector);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  return (
    <>
    {userInfo && (    
    <HeaderContainer>
      <Logo />
      <LeftContents>
        {props.isLogin ? (
          <>
            <StyledPointContainer onClick={props.onCoinClick}>
              <Icon src={Coin} width='24px' height='24px' />
              <StyledPoint>{addCommaInNumber(userInfo.coin)}</StyledPoint>
            </StyledPointContainer>
            <Icon src={Bell} width='24px' height='24px' />
            <StyledButtonContainer>
              <MyPageContainer>
                <Button onButtonClick={props.onClickMyPage} backgroundColor='#E1A3B3' width='85px' height='33px' borderRadius='15px' children={<p>마이페이지</p>} fontColor='#fff' fontSize='16px' />
                {props.isMyPageOpen && <MyPageCard isCoinOpenPage={props.isCoinPageOpen} onCoinClick={props.onCoinClick} />}
              </MyPageContainer>
              <Button onButtonClick={props.onClickLogout} backgroundColor='#fff' width='85px' height='33px' borderRadius='15px' children={<p>로그아웃</p>} fontColor='#E1A3B3' borderColor='#E1A3B3' fontSize='16px' />
            </StyledButtonContainer>
          </>
        ) : (
          <StyledButtonContainer>
            <Button onButtonClick={props.onClickSignUp} backgroundColor='#E1A3B3' width='85px' height='33px' borderRadius='15px' children={<p>회원가입</p>} fontColor='#fff' fontSize='16px' />
            <Button onButtonClick={props.onClickLogin} backgroundColor='#fff' width='85px' height='33px' borderRadius='15px' children={<p>로그인</p>} fontColor='#E1A3B3' borderColor='#E1A3B3' fontSize='16px' />
          </StyledButtonContainer>
        )}
        {/* 로그인, 회원가입 */}
      </LeftContents>
    </HeaderContainer>
      )}
    </>
  );
};

export default Header;
