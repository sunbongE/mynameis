import styled from 'styled-components';

interface MsgDateProps {
  date: string;
}
const StyledMsgDateContainer = styled.div`
  display: flex;
  width: 100%;
  /* border: 1px solid black; */
  margin: 15px 0;
`;
const StyledMsgDate = styled.p`
  width: 100%;
  color: #333;
  font-family: 'Pretendard Regular';
  font-size: 10px;
  letter-spacing: 0.4px;
  text-align: center;
`;

const MessageDate = (props: MsgDateProps) => {
  return (
    <StyledMsgDateContainer>
      <StyledMsgDate>{props.date}</StyledMsgDate>
    </StyledMsgDateContainer>
  );
};

export default MessageDate;
