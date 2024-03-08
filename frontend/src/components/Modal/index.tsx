import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  children: React.ReactNode;
}

const Dimmer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  width: 50%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const Modal = (props: ModalProps) => {
  return (
    <Dimmer>
      <ModalContainer>{props.children}</ModalContainer>
    </Dimmer>
  );
};

export default Modal;
