import React from 'react';
import styled from 'styled-components';

interface HashtagButtonProps {
  backgroundColor: string;
  children: React.ReactNode;
}

const HashtagBox = styled.div<HashtagButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 40px;
  padding: 10px;
  background-color: pink;
  color: white;
  font-family: 'Pretendard SemiBold';
  background-color: ${(props) => props.backgroundColor};
`;

const HashtagButton = (props: HashtagButtonProps) => {
  return <HashtagBox backgroundColor={props.backgroundColor}>{props.children}</HashtagBox>;
};

export default HashtagButton;
