import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import styled from 'styled-components';

interface DropdownProps {
  width?: string;
  options: Array<string>;
  onSelected?: (value: string) => void;
}

const StyledDropdownContainer = styled.div`
  /* width: '300px'; */
`;
const StyledDropdown = styled(Dropdown)<DropdownProps>`
  width: ${(props) => (props.width ? props.width : `300px`)};
  height: 50px;
  .control {
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    border : 1px solid #eaeaea;
  }

  .menu {
    border : 1px solid #eaeaea;
    margin-top: 3px;
    border-radius: 10px;
    max-height: 150px; /* 조절 가능한 최대 높이 */
    overflow-y: auto; /* 스크롤 가능하게 만듭니다. */
  }

  .menu .Dropdown-option:hover {
    background-color: #fdf9fa;
  }

  .menu .is-selected {
    background-color: #fdf9fa;
  }

  .arrow {
    margin-top: 8px;
  }
`;

const CustomDropdown = (props: DropdownProps) => {
  const options = props.options;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const handleSelectChange = (selectedOption: any) => {
    setSelectedValue(selectedOption.value);
    if (props.onSelected) {
      props.onSelected(selectedOption.value);
      console.log(selectedOption.value)
    }
  };

  useEffect(() => {
    console.log('useEffect 값 : ' + selectedValue);
  }, [selectedValue]);

  return (
    <StyledDropdownContainer>
      <StyledDropdown options={props.options} onChange={handleSelectChange} value={selectedValue} width={props.width} controlClassName='control' menuClassName='menu' arrowClassName='arrow' />
    </StyledDropdownContainer>
  );
};

export default CustomDropdown;
