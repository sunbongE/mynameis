import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NoticeBox from '../../components/noticeBox/NoticeBox';
import Timer from '../../components/timer/Timer';
import VideoCard from '../../components/videoCard/VideoCard';
import VideoButton from '../../components/videoButton/VideoButton';
import HashtagButton from '../../components/hashtagButton/HashtagButton';
import Icon from '../../components/icon/Icon';
import { Notice, Report, Star } from '../../config/IconName';
import { calcAge } from '../../utils/numberUtil';
import MyModal from '../../components/modal/MyModal';
import VoteModal from './VoteModal';
import { ExitModal } from './ExitModal';
import VoteCountHeart from '../../components/voteCountHeart/VoteCountHeart';
import ReportModal from './ReportModal';
import { StreamManager, Subscriber } from 'openvidu-browser';
import { useRecoilValue } from 'recoil';
import { matchingInfoState } from '../../recoil/atoms/matchingState';

interface MeetingRoomProps {
  publisher: StreamManager | undefined;
  subscribers: Subscriber[];
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  leaveSession: () => Promise<void>;
  voteValues: Array<Object>;
  selectedValue: any;
  setSelectedValue: React.Dispatch<React.SetStateAction<any>>;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  receivedCount: number;
  roomId: string | undefined;
  curId: number;
}

const MeetingRoom = (props: MeetingRoomProps) => {
  const [notice, setNotice] = useState<string>('공개된 정보인 [배정된 이름, 나이, 지역]만을 통해 60초씩 본인을 소개해주세요.');
  const [time, setTime] = useState<number>(60); // 공지 부분 타이머 시간, 초단위
  const [repeatCount, setRepeatCount] = useState<number>(props.subscribers.length + 1); // 공지 부분 타이머 반복 횟수
  const [modalTime, setModalTime] = useState<number>(10); // 투표 모달 타이머 시간, 초단위
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const matchingInfo = useRecoilValue(matchingInfoState);
  const [myInfo, setMyInfo] = useState({
    mySessionId: '',
    myUserName: matchingInfo.randomName,
    myGender: matchingInfo.gender,
    myBirth: matchingInfo.birth,
    myArea: matchingInfo.area,
    myJob: matchingInfo.job,
    myTag: matchingInfo.tag,
    myUserId: matchingInfo.userId,
  });

  const balanceGame = [
    '아프지만 말하지 않는 연인 vs 아프지 않지만 항상 아프다고 말하는 연인',
    '돈을 잃어도 화를 내는 연인 vs 돈을 아끼는 데 최고인 연인',
    '싸움 뒤에 모든 것을 얘기하는 연인 vs 싸움 뒤에 전혀 영향받지 않는 듯한 연인',
  ];

  let intervalId: NodeJS.Timeout | null = null;

  const updateBalanceGame = () => {
    if (balanceGame.length > 1) {
      balanceGame.shift();
      setNotice(`이번 주제는 “${balanceGame[0]}” 입니다. 10분 동안 대화를 나눠보세요!`);
    } else {
      clearInterval(intervalId!);
    }
  };

  useEffect(() => {
    if (props.state === 'step12345') {
      intervalId = setInterval(
        () => {
          updateBalanceGame();
        },
        time * 1000 + 500
      );
    }
  }, [time]);

  useEffect(() => {
    if (props.state === 'step12') {
      setNotice('공개된 정보인 [키워드]를 통해 10분동안 자유롭게 대화를 나눠보세요.');
      setTime(2);
      setRepeatCount(0);
    } else if (props.state === 'step12_vote') {
      setModalTime(10); // 모달 시간 설정
      setVoteModalOpen(true);
    } else if (props.state === 'step123') {
      setVoteModalOpen(false);
      setNotice('공개된 정보인 [직업]을 통해 1명당 5분씩 질의응답 시간을 가져 보세요.');
      setTime(3);
      setRepeatCount(props.subscribers.length + 1);
    } else if (props.state === 'step123_vote') {
      setModalTime(10);
      setVoteModalOpen(true);
    } else if (props.state === 'step1234') {
      setNotice('참여자 분들의 얼굴이 공개되었습니다! 1명당 5분씩 자유롭게 질문 시간을 가져보세요. 질문 시간 후에는 밸런스 게임이 시작됩니다.');
      setTime(2);
      setRepeatCount(props.subscribers.length + 1);
    } else if (props.state === 'step12345') {
      setTime(10);
      setNotice(`이번 주제는 “${balanceGame[0]}” 입니다. 10분 동안 대화를 나눠보세요!`);
      setRepeatCount(3);
    } else if (props.state === 'step12345_vote') {
      setModalTime(10);
      setVoteModalOpen(true);
    }
  }, [props.state, repeatCount]);

  const [voteModalOpen, setVoteModalOpen] = useState(false);

  // 신고 관련 파트
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportUser, setReportUser] = useState(''); // 신고할 회원
  const handleReport = (userId: string) => {
    setReportUser(userId);
    setReportModalOpen(true);
  };

  return (
    <MeetingRoomContainer>
      <NoticeContainer>
        <NoticeBox noticeText={notice} />
        <Timer repeatCount={repeatCount} time={time} state={props.state} setState={props.setState} />
      </NoticeContainer>
      <VideoContainer>
        <VideoCard width={'40vw'} height={'37vh'} streamManager={props.publisher} userType={0}>
          <InfoContainer>
            <HashtagContainer justifyContent='space-between'>
              <div style={{ display: 'flex', gap: '4px' }}>
                <HashtagButton backgroundColor={myInfo.myGender ? '#A5A4E1' : '#E1A4B4'}>{myInfo.myUserName}</HashtagButton>
                {props.state.includes('step123') && <VoteCountHeart color={myInfo.myGender ? 'purple' : 'pink'} count={props.receivedCount} />}
              </div>
            </HashtagContainer>
            <HashtagWrapper>
              {props.state.includes('step1') && (
                <HashtagContainer>
                  <HashtagButton fontSize='14px' padding='6px'>
                    #{myInfo.myArea}
                  </HashtagButton>
                  <HashtagButton fontSize='14px' padding='6px'>
                    #{calcAge(myInfo.myBirth)}세
                  </HashtagButton>
                </HashtagContainer>
              )}
              {props.state === 'step12' || props.state === 'step12_vote' ? (
                <HashtagContainer>
                  <HashtagButton fontSize='14px' padding='6px'>
                    #{myInfo.myTag[0]}
                  </HashtagButton>
                  <HashtagButton fontSize='14px' padding='6px'>
                    #{myInfo.myTag[1]}
                  </HashtagButton>
                  <HashtagButton fontSize='14px' padding='6px'>
                    #{myInfo.myTag[2]}
                  </HashtagButton>
                </HashtagContainer>
              ) : (
                props.state.includes('step123') && (
                  <HashtagContainer>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{myInfo.myTag[0]}
                    </HashtagButton>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{myInfo.myTag[1]}
                    </HashtagButton>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{myInfo.myTag[2]}
                    </HashtagButton>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{myInfo.myJob}
                    </HashtagButton>
                  </HashtagContainer>
                )
              )}
            </HashtagWrapper>
          </InfoContainer>
        </VideoCard>
        {props.subscribers.map((sub) => (
          <VideoCard width={'40vw'} height={'37vh'} streamManager={sub} userType={1}>
            <InfoContainer>
              <HashtagContainer justifyContent='space-between'>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <HashtagButton backgroundColor={JSON.parse(JSON.parse(sub.stream.connection.data).clientData).myGender ? '#A5A4E1' : 'E1A4B4'}>
                    {JSON.parse(JSON.parse(sub.stream.connection.data).clientData).myUserName}
                  </HashtagButton>
                </div>
                <ClickBox onClick={() => handleReport(JSON.parse(JSON.parse(sub.stream.connection.data).clientData).myUserId)}>
                  {/* <HashtagButton>신고</HashtagButton> */}
                  <Icon src={Report} width='24px' height='24px' />
                </ClickBox>
              </HashtagContainer>
              <HashtagWrapper>
                {props.state.includes('step1') && (
                  <HashtagContainer>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{JSON.parse(JSON.parse(sub.stream.connection.data).clientData).myArea}
                    </HashtagButton>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{calcAge(JSON.parse(JSON.parse(sub.stream.connection.data).clientData).myBirth)}세
                    </HashtagButton>
                  </HashtagContainer>
                )}
                {props.state === 'step12' || props.state === 'step12_vote' ? (
                  <HashtagContainer>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{JSON.parse(JSON.parse(sub.stream.connection.data).clientData).myTag[0]}
                    </HashtagButton>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{JSON.parse(JSON.parse(sub.stream.connection.data).clientData).myTag[1]}
                    </HashtagButton>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{JSON.parse(JSON.parse(sub.stream.connection.data).clientData).myTag[2]}
                    </HashtagButton>
                  </HashtagContainer>
                ) : (
                  props.state.includes('step123') && (
                    <HashtagContainer>
                      <HashtagButton fontSize='14px' padding='6px'>
                        #{JSON.parse(JSON.parse(sub.stream.connection.data).clientData).myTag[0]}
                      </HashtagButton>
                      <HashtagButton fontSize='14px' padding='6px'>
                        #{JSON.parse(JSON.parse(sub.stream.connection.data).clientData).myTag[1]}
                      </HashtagButton>
                      <HashtagButton fontSize='14px' padding='6px'>
                        #{JSON.parse(JSON.parse(sub.stream.connection.data).clientData).myTag[2]}
                      </HashtagButton>
                      <HashtagButton fontSize='14px' padding='6px'>
                        #{JSON.parse(JSON.parse(sub.stream.connection.data).clientData).myJob}
                      </HashtagButton>
                    </HashtagContainer>
                  )
                )}
              </HashtagWrapper>
            </InfoContainer>
          </VideoCard>
        ))}
      </VideoContainer>
      <VideoButtonContainer>
        <VideoButton exitModalOpen={exitModalOpen} setExitModalOpen={setExitModalOpen} />
      </VideoButtonContainer>
      <MyModal isOpen={voteModalOpen} setIsOpen={setVoteModalOpen}>
        <VoteModal
          isOpen={voteModalOpen}
          setIsOpen={setVoteModalOpen}
          state={props.state}
          setState={props.setState}
          time={modalTime}
          voteValues={props.voteValues}
          selectedValue={props.selectedValue}
          setSelectedValue={props.setSelectedValue}
          setIsSelected={props.setIsSelected}
        />
      </MyModal>
      <MyModal isOpen={exitModalOpen} setIsOpen={setExitModalOpen}>
        <ExitModal handleLeave={props.leaveSession} exitModalOpen={exitModalOpen} setExitModalOpen={setExitModalOpen} />
      </MyModal>
      <MyModal isOpen={reportModalOpen} setIsOpen={setReportModalOpen}>
        <ReportModal curId={props.curId} roomId={props.roomId} userId={reportUser} reportModalOpen={reportModalOpen} setReportModalOpen={setReportModalOpen} />
      </MyModal>
    </MeetingRoomContainer>
  );
};

////////////////////////////////////////////////////
/////////// styled component //////////////////////
///////////////////////////////////////////////////
const MeetingRoomContainer = styled.div`
  padding: 10px;
`;

const NoticeContainer = styled.div`
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VideoContainer = styled.div`
  padding: 10px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 40px;
  row-gap: 30px;
  flex-wrap: wrap;
`;

const VideoButtonContainer = styled.div`
  margin-top: 3px;
  display: flex;
  justify-content: center;
`;

interface FlexBoxProps {
  justifyContent?: string;
  alignItems?: string;
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  height: 100%;
  width: 100%;
  z-index: 10;
  position: absolute;
  top: -0.1px;
`;

const HashtagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const HashtagContainer = styled.div<FlexBoxProps>`
  margin-right: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'flex-start')};
`;

const ClickBox = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export default MeetingRoom;
