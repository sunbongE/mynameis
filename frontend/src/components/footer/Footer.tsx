import React from 'react';
import styled from 'styled-components';
import Button from '../button/Button';
const StyledFooter = styled.div`
  height: 180px;
  display: flex;
  align-items: center;
`;

const StyledText = styled.p`
  margin-left: 130px;
  color: #b8b1b1;
  font-size: 18px;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <StyledText>Copyright © 2024 KBBSC</StyledText>
    </StyledFooter>
  );
};

export default Footer;
