import React from 'react';
import styled from 'styled-components';

interface IconProps {
  width?: string | '100%';
  height?: string | '100%';
  src: string;
  children?: React.ReactNode;
}

const StyledIconContainer = styled.div<IconProps>`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled.img`
  width: '100%';
  height: '100%';
`;

const StyledChildrenContainer = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
`;

const Icon = (props: IconProps) => {
  return (
    <StyledIconContainer {...props}>
      <StyledIcon src={props.src} />
      {props.children && <StyledChildrenContainer>{props.children}</StyledChildrenContainer>}
    </StyledIconContainer>
  );
};

export default Icon;
