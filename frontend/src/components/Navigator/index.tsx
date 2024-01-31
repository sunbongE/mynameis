import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface NavigatorProps {
  isLogin: boolean;
}

const NavigatorContainer = styled.div`
  width: 25%;
  height: 100%;
  border: 1px solid red;
  padding: 10px;
`;

const StyledText = styled.p`
  margin-top: 15px;
  cursor: pointer;
`;

const Navigator = (props: NavigatorProps) => {
  const navigate = useNavigate();

  return (
    <NavigatorContainer>
      <StyledText onClick={() => navigate('/')}>홈</StyledText>
      <StyledText onClick={() => navigate('/history')}>지난 회의 내역</StyledText>
    </NavigatorContainer>
  );
};

export default Navigator;
