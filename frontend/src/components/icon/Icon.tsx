import React from 'react';
import styled from 'styled-components';

interface WriterIconProps {
  width?: string | '100%';
  height?: string | '100%';
  src?: string;
}

const StyledIcon = styled.img<WriterIconProps>`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
`;

const Icon = (props: WriterIconProps) => {
  return <StyledIcon {...props} />;
};

export default Icon;
