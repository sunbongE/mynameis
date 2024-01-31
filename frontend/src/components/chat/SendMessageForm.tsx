import styled from 'styled-components';
import { SimpleInput } from '../input/Input';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import { SendMsg } from '../../config/IconName';

const StyledMsgFormContainer = styled.div`
  width: 320px;
  padding: 5px;
  display: flex;
  column-gap: 5px;
  border-radius: 0px 0px 15px 15px;
  border-top: 1px solid #f3dbe1;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(243, 219, 225, 0.25);
`;

const SenderMessageForm = () => {
  return (
    <StyledMsgFormContainer>
      <SimpleInput placeholder='메세지를 입력하세요' value='' height='40px' fontsize='12px' />
      <Button backgroundColor='#E1A4B4' width='50px' height='40px' borderRadius='10px' children={<Icon src={SendMsg} width='100%' />} />
    </StyledMsgFormContainer>
  );
};

export default SenderMessageForm;
