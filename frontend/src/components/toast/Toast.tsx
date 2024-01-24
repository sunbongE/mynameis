import styled from 'styled-components';

interface ToastProps {
  children?: React.ReactNode;
}

const StyledToastContainer = styled.div`
  width: 398px;
  height: 73px;
  border-radius: 20px;
  background: #323232;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-family: 'Pretendard Medium';
`;

/**
 * @author 김아현
 * @param props
 * @returns
 */
const Toast = (props: ToastProps) => {
  return <StyledToastContainer>{props.children}</StyledToastContainer>;
};

export default Toast;
