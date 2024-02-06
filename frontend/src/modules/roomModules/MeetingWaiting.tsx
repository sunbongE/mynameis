import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../components/icon/Icon';
import { Star } from '../../config/IconName';
import VideoCard from '../../components/videoCard/VideoCard';
import VideoButton from '../../components/videoButton/VideoButton';
import MyModal from '../../components/modal/MyModal';
import ExitModal from './ExitModal';
import { useRecoilState } from 'recoil';
import { MatchingInfo, matchingInfoState } from '../../recoil/atoms/matchingState';
import { StreamManager } from 'openvidu-browser';

interface LoadingProps {
  streamManager: StreamManager | undefined;
  userType: number;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const MeetingWaiting = (props: LoadingProps) => {
  const [seconds, setSeconds] = useState<number>(100);
  const [exitModalOpen, setExitModalOpen] = useState<boolean>(false);
  const [matchingInfo, setMatchingInfo] = useRecoilState<MatchingInfo>(matchingInfoState);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(timerId);
          props.setState('step1');
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);
  return (
    <LoadingContainer>
      <LoadingHeader>
        <Icon src={Star} width='16px' height='16px' />
        <StyledText fontSize='28px' margin='20px'>
          저의 이름은
        </StyledText>{' '}
        <StyledText fontSize='18px'>당신의 이름은 "{props.streamManager !== undefined && JSON.parse(JSON.parse(props.streamManager.stream.connection.data).clientData).myUserName}" 입니다.</StyledText>
        <StyledText fontSize='18px'>당신의 이름은 "{props.streamManager !== undefined && JSON.parse(props.streamManager.stream.connection.data).clientData}" 입니다.</StyledText>
        <StyledText fontSize='18px'>당신의 이름은 "{props.streamManager !== undefined && typeof JSON.parse(props.streamManager.stream.connection.data).clientData}" 입니다.</StyledText>
        {/* <StyledText fontSize='18px'>당신의 이름은 "{typeof props.streamManager?.stream.connection.data}" 입니다.</StyledText> */}
      </LoadingHeader>
      <VideoContainer>
        {/* **********여기에 openvidu 화면 추가해야함******** */}
        <VideoCard width={'600px'} height={'320px'} streamManager={props.streamManager} userType={props.userType} />
      </VideoContainer>
      <StyledText fontSize='18px' margin='0 0 10px 0'>
        좋은 시간 보낼 준비 되셨나요?
      </StyledText>
      <StyledText fontSize='18px'>이제 곧 미팅이 시작되니, 단계에 따라 미팅을 진행해주세요 :)</StyledText>
      <ButtonContainer>
        <StyledText fontSize='18px'>{seconds}초 후에 시작됩니다</StyledText>
      </ButtonContainer>
      <VideoButton exitModalOpen={exitModalOpen} setExitModalOpen={setExitModalOpen} />
      <MyModal isOpen={exitModalOpen} setIsOpen={setExitModalOpen}>
        <ExitModal exitModalOpen={exitModalOpen} setExitModalOpen={setExitModalOpen} />
      </MyModal>
    </LoadingContainer>
  );
};

//////////////////////////
//////styled component ///
//////////////////////////
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const LoadingHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const VideoContainer = styled.div`
  margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
  margin: 40px 0px;
  padding: 10px 20px;
  width: 256px;
  height: 58px;
  border-radius: 20px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface TextStyleProps {
  fontFamily?: string;
  fontSize?: string;
  margin?: string;
}

const StyledText = styled.p<TextStyleProps>`
  font-family: ${(props) => (props.fontFamily ? props.fontFamily : 'Pretendard SemiBold')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '20px')};
  margin: ${(props) => props.margin};
`;

export default MeetingWaiting;
