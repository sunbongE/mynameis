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
  display: flex;
  align-items: center;
  justify-content: center;
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

/**
 * Icon 컴포넌트
 *
 * [필수]
 * - src : '/icons/check.svg'와 같이 icon 경로 입력. / config에서 경로 선언 후 가져와서 사용하는 것을 추천
 *
 * [선택]
 * - width : '12px' 과 같이 크기 단위와 함께 지정 | '100%'
 * - height : '12px' 과 같이 크기 단위와 함께 지정 | '100%'
 * - children
 * @author 김아현
 * @param props
 * @returns
 */
const Icon = (props: IconProps) => {
  return (
    <StyledIconContainer {...props}>
      <StyledIcon src={props.src} />
      {props.children && <StyledChildrenContainer>{props.children}</StyledChildrenContainer>}
    </StyledIconContainer>
  );
};

export default Icon;
