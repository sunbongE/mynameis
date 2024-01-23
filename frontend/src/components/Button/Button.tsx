import React from 'react';
import styled from 'styled-components';

interface TextProps {
  fontColor: string;
  fontSize: string;
  children?: React.ReactNode;
}

interface ButtonProps extends TextProps {
  backgroundColor: string;
  width: string;
  height: string;
  borderRadius?: string;
  borderColor?: string;
  onButtonClick?: () => {};
}

const StyledButton = styled.button<ButtonProps>`
  font-family: 'Pretendard SemiBold';
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : '#FFFFFF')};
  width: ${(props) => (props.width ? props.width : '455px')};
  height: ${(props) => (props.height ? props.height : '66px')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '10px')};
  color: ${(props) => (props.fontColor ? props.fontColor : '#000000')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '18px')};
  border: 1px solid ${(props) => props.borderColor};
`;

const Button = (props: ButtonProps) => {
  return (
    <StyledButton backgroundColor={props.backgroundColor} width={props.width} height={props.height} borderRadius={props.borderRadius} borderColor={props.borderColor} fontColor={props.fontColor} fontSize={props.fontSize}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
