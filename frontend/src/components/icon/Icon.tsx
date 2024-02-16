import React from 'react';
import styled from 'styled-components';

interface IconProps {
  width?: string | '100%';
  height?: string | '100%';
  src: string;
  children?: React.ReactNode;
  marginRight?:string;
}

const StyledIconContainer = styled.div<IconProps>`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  margin-right: ${(props) => props.marginRight || undefined};
  position: relative;
`;

const StyledIcon = styled.img`
  width: ${(props) => props.width || '25px'};
  height: ${(props) => props.height || '25px'};
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
