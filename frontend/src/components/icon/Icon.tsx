import React from 'react';
import styled from 'styled-components';
import { Heart_Pink, Heart_Purple } from '../../config/IconName';

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
  const iconSrc = props.src === 'pink' ? Heart_Pink : Heart_Purple;
  return (
    <StyledIconContainer {...props}>
      <StyledIcon src={iconSrc} />
      <StyledChildrenContainer>{props.children}</StyledChildrenContainer>
    </StyledIconContainer>
  );
};

export default Icon;
