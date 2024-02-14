import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '../../components/icon/Icon';
import { Close, ReportRed } from '../../config/IconName';
import ReportCheckBoxItem from '../../components/reportCheckBox/ReportCheckBox';
import Button from '../../components/button/Button';
import { useRecoilState } from 'recoil';
import { matchingInfoState } from '../../recoil/atoms/matchingState';

interface ReportModalProps {
  reportModalOpen: boolean;
  setReportModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  roomId: string | undefined;
  curId: number;
}

const ReportModal = (props: ReportModalProps) => {
  const reportContents = [
    { reportTitle: '욕설', reportContent: '상처감을 주거나 부적절한 언어를 사용한 경우, 해당 내용을 신고해주세요.' },
    { reportTitle: '성희롱', reportContent: '성별, 성적 지향, 신체적 특성에 대한 모욕적인 행동이나 언어를 경험한 경우 신고해주세요.' },
    { reportTitle: '결제유도', reportContent: '무단 결제 유도, 사기성 행위, 혹은 부적절한 금전적 요구가 있었을 경우 해당 내용을 신고해주세요.' },
    { reportTitle: '자해', reportContent: '자해 혹은 상해 유발을 목적으로 하는 사용자를 발견했을 경우 신고해주세요.' },
    { reportTitle: '노출', reportContent: '무단으로 사용자의 신체적 부분이나 적절하지 않은 콘텐츠가 노출되어 있을 경우 해당 내용을 신고해주세요.' },
    { reportTitle: '기타', reportContent: '위 분류에 포함되지 않는 다른 문제에 대해 신고할 때 선택해주세요.' },
  ];

  const [reportTitle, setReportTitle] = useState<string>('');

  const [myInfo, setMyInfo] = useRecoilState(matchingInfoState);

  const handleReport = () => {
    console.log(`${props.userId}에 대해 ${reportTitle}으로 신고할거임`);
    const params = { roomId: props.roomId, reporterId: myInfo.userId, reportedId: props.userId, reportType: reportTitle, curId: props.curId };
    // 여기서 백한테 신고 보내야함
    // const data = reportUpload(params);
    props.setReportModalOpen(false);
  };

  const handleClose = () => {
    props.setReportModalOpen(false);
  };

  return (
    <ModalContainer>
      <div onClick={handleClose} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <Icon src={Close} width='8px' height='8px' />
      </div>
      <ModalTitle>
        <Icon src={ReportRed} width='26px' height='26px' />
        <StyledText fontSize='24px'>사용자 신고하기</StyledText>
      </ModalTitle>
      <ModalSubTitle>
        <StyledText fontFamily='Pretendard Regular'>서비스 이용 중 발생하는 문제나 부정적인 경험을 개선하고자 신고 기능을 도입했습니다. </StyledText>
        <StyledText fontFamily='Pretendard Regular'>아래 신고 유형을 선택하여 자세한 내용을 제공해 주시면, 해당 사용자에 대해 신속하고 </StyledText>
        <StyledText fontFamily='Pretendard Regular'>효과적으로 조치를 취할 수 있습니다. </StyledText>
      </ModalSubTitle>
      <CheckBoxContainer>
        {reportContents.map((reportContent) => (
          <div onClick={() => setReportTitle(reportContent.reportTitle)}>
            <ReportCheckBoxItem reportTitle={reportContent.reportTitle} reportContent={reportContent.reportContent} />
          </div>
        ))}
      </CheckBoxContainer>
      <ButtonContainer>
        <Button onButtonClick={handleReport} backgroundColor={'#e1a4b4'} width={'176px'} height={'50px'} borderRadius={'10px'} fontColor='white'>
          신고하기
        </Button>
      </ButtonContainer>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  padding: 10px;
`;

const ModalTitle = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

const ModalSubTitle = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 2px;
`;

const CheckBoxContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

interface TextStyleProps {
  fontFamily?: string;
  fontSize?: string;
}

const StyledText = styled.p<TextStyleProps>`
  font-family: ${(props) => (props.fontFamily ? props.fontFamily : 'Pretendard SemiBold')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '14px')};
`;

export default ReportModal;
