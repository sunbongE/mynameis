import React, { useState } from 'react';
import styled from 'styled-components';

interface RadioButtonProps extends RadioButtonStyleProps {
  values: Array<any>;
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
}

interface RadioButtonStyleProps {
  version?: string;
  width?: string;
  id?: string;
  key?: string;
  onSelected?: (value: any) => void;
}

const RadioInputBox = styled.div<RadioButtonStyleProps>`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  background-color: white;
  width: ${(props) => (props.version === 'gender' ? '145px' : props.width)};
  height: ${(props) => (props.version === 'gender' ? '66px' : '80px')};
  margin-right: 10px;
`;

const RadioInput = styled.input<RadioButtonStyleProps>`
  display: none;
  margin: -1px;
  position: absolute;

  &:checked + label {
    border: 2px solid #e1a3b3;
    color: ${(props) => props.version === 'gender' && '#e1a3b3'};
  }
`;

const RadioInputLabel = styled.label<RadioButtonStyleProps>`
  font-family: 'Pretendard SemiBold';
  cursor: pointer;
  color: ${(props) => (props.version === 'gender' ? '#B0A9A9' : 'black')};
  font-size: ${(props) => (props.version === 'gender' ? '15px' : '37px')};
  width: ${(props) => (props.version === 'gender' ? '145px' : props.width)};
  height: ${(props) => (props.version === 'gender' ? '66px' : '80px')};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/**
 * CustomRadioButton
 * - values: 선택할 값 후보들 (name 속성 값이 같아야함) ex) values = [{id: 0, name: 'gender', value: '여성'}, {id: 1, name: 'gender', value: '남성'}]
 * - version: 성별 선택일 경우 'gender' / 투표일 경우 'vote'
 * - selected: 선택한 값을 저장할 state value
 * - setSelected: 선택한 값의 상태를 지정할 state setter
 * - width: version이 vote일 경우 지정할 너비
 * @param props
 * @returns
 * @author 조은서
 */
export const CustomRadioButton = (props: RadioButtonProps) => {
  return (
    <>
      {props.values.map((value) => (
        <RadioInputBox
          key={value.value}
          onClick={() => {
            props.setSelected(value.id);
            if (props.onSelected) {
              props.onSelected(value.id);
            }
          }}
          version={props.version}
          width={props.width}
          onSelected={value.value}
        >
          <RadioInput version={props.version} type='radio' id={value.value} name={value.name} value={value.value} checked={props.selected === value.id} onChange={() => props.setSelected(value.id)} />
          <RadioInputLabel version={props.version} htmlFor={value.name} width={props.width}>
            {value.value}
          </RadioInputLabel>
        </RadioInputBox>
      ))}
    </>
  );
};

const SimpleRadioBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 18px;
  margin: 0px 10px;
`;

const SimpleRadioInput = styled.input`
  margin-right: 5px;
  width: 14px;
  height: 14px;
`;

const SimpleRadioLabel = styled.label`
  font-family: 'Pretendard SemiBold';
  font-size: 16px;
`;

/**
 * SimplRadioButton
 * @param props
 * @returns
 * @author 조은서
 */
export const SimpleRadioButton = (props: RadioButtonProps) => {
  return (
    <>
      {props.values.map((value) => (
        <SimpleRadioBox key={value.value}>
          <SimpleRadioInput type='radio' name={value.name} checked={props.selected === value.id} onChange={() => props.setSelected(value.id)} />
          <SimpleRadioLabel htmlFor={value.name}>{value.value}</SimpleRadioLabel>
        </SimpleRadioBox>
      ))}
    </>
  );
};
