import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onButtonClick: () => void;
  children: React.ReactNode;
}

const StyledButton = styled.button`
  border-radius: 10px;
  border: none;
  background-color: black;
  color: white;
  width: 30%;
  height: 40px;
  margin: 10px;
`;

const Button = (props: ButtonProps) => {
  return <StyledButton onClick={props.onButtonClick}>{props.children}</StyledButton>;
};

export default Button;
