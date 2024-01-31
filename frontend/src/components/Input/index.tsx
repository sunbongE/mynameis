import React from 'react';
import styled from 'styled-components';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeInput: (value: any) => void;
  type: string;
}

const StyledInput = styled.input`
  height: 30px;
  width: 80%;
  margin: 5px;
  border-radius: 10px;
  padding: 5px;
`;

const Input = (props: InputProps) => {
  return <StyledInput type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChangeInput} />;
};

export default Input;
