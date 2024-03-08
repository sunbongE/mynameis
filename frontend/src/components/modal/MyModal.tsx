import React from 'react';
import Modal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const customStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.25)',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '16px',
  },
};

const MyModal = (props: ModalProps) => {
  return (
    <Modal isOpen={props.isOpen} onRequestClose={() => props.setIsOpen(false)} shouldCloseOnOverlayClick={false} style={customStyles}>
      {props.children}
    </Modal>
  );
};

export default MyModal;
