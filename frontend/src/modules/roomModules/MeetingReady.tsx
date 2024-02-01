import React, { useState } from 'react';
import styled from 'styled-components';
import NoticeBox from '../../components/noticeBox/NoticeBox';
import Icon from '../../components/icon/Icon';
import { TimerIcon } from '../../config/IconName';
import Timer from '../../components/timer/Timer';
import VideoButton from '../../components/videoButton/VideoButton';
import VideoCard from '../../components/videoCard/VideoCard';
import HashtagButton from '../../components/hashtagButton/HashtagButton';

interface MeetingReadyProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const StyledContainer = styled.div`
  padding: 10px;
`;

const NoticeContainer = styled.div`
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VideoContainer = styled.div`
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const HashtagContainer = styled.div`
  padding: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const MeetingReady = (props: MeetingReadyProps) => {
  const [time, setTime] = useState(15);
  // recoil에서 가져오는 사용자 정보
  const userInfo = { userId: 'ssafy1', gender: false, nickName: '영자', area: '서울', birth: '19990520', tags: ['INFP', '산책', '패러글라이딩'] };

  return (
    <StyledContainer>
      <NoticeContainer>
        <NoticeBox noticeText={'15초 후에 참여자 분들의 얼굴이 공개 됩니다! 얼굴 공개 전 잠시 준비 시간을 가져 볼까요?'} />
        <Timer time={time} state={props.state} setState={props.setState} repeatCount={0} />
      </NoticeContainer>
      <VideoContainer>
        <VideoCard width={'70vw'} height={'70vh'}>
          <HashtagContainer>
            <HashtagButton backgroundColor={userInfo.gender ? '#A5A4E1' : '#e1a4b4'}>{userInfo.nickName}</HashtagButton>
          </HashtagContainer>
        </VideoCard>
      </VideoContainer>
      <VideoButtonContainer>
        <VideoButton />
      </VideoButtonContainer>
    </StyledContainer>
  );
};

export default MeetingReady;
