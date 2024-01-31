import styled from 'styled-components';
import Icon from '../icon/Icon';
import { Notice } from '../../config/IconName';

interface NoticeBoxProps {
  noticeText: string;
}

const NoticeBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledText = styled.p`
  font-family: 'Pretendard SemiBold';
  font-size: 16px;
  margin-left: 8px;
`;

const NoticeBox = (props: NoticeBoxProps) => {
  return (
    <NoticeBoxContainer>
      <Icon src={Notice} width='24px' height='24px' />
      <StyledText>{props.noticeText}</StyledText>
    </NoticeBoxContainer>
  );
};

export default NoticeBox;
