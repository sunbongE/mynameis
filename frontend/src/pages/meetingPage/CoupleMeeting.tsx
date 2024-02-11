import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { OpenVidu, Subscriber, Publisher, Session as OVSession, StreamManager, StreamEvent, ExceptionEvent, Session } from 'openvidu-browser';
import { getCoupleRoomToken } from '../../apis/services/user/room';
import VideoCard from '../../components/videoCard/VideoCard';
import NoticeBox from '../../components/noticeBox/NoticeBox';
import Button from '../../components/button/Button';
import { reportUser } from '../../apis/services/user/user';
import VideoButton from '../../components/videoButton/VideoButton';
import MyModal from '../../components/modal/MyModal';
import { ExitCoupleModal } from '../../modules/roomModules/ExitModal';
import HashtagButton from '../../components/hashtagButton/HashtagButton';
import { blobToFile, sendRecordingFile } from '../../utils/reportUtils';
export interface MyData {
  mySessionId: String;
  myUserName: String;
}

const CoupleMeeting = () => {
  // 1. 필요한 상태 정의
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [session, setSession] = useState<OVSession | undefined>(undefined);
  const [initMyData, setInitMyData] = useState<MyData>({
    mySessionId: '',
    myUserName: '',
  });
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | undefined>(undefined); // 방장?!
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined); // 방 생성한 사람
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]); // 나를 제외한 참여자들
  const [notice, setNotice] = useState<string>('연인의 이성 사람 친구에 대한 당신의 생각은 어떤가요? 허용할 수 있는 범위는 어디까지인가요?'); // 질문 리스트 넣어야해
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const navigate = useNavigate();

  // 방 나가기 버튼
  const handleLeaveBtn = async () => {
    console.log('이 방 제가 나가보겠습니다.', session);
    await leaveSession();
    console.log('leaveSession publisher ', publisher);
    console.log('leaveSession subscribers ', subscribers);
    navigate('/');
  };

  const initOV = () => {
    // 1. OpenVidu 객체 생성
    const nOV = new OpenVidu();
    setOV(nOV);
    // 2. Session 초기화
    const nSession = nOV.initSession();
    setSession(nSession);
    // openvidu log 멈춰!!
    nOV.enableProdMode();
  };

  useEffect(() => {
    if (initMyData.mySessionId === '') {
      initOV();
    }
  }, [initMyData.mySessionId]);

  useEffect(() => {
    if (session) {
      joinSession();
    }
  }, [session]);

  useEffect(() => {
    if (!session) return;
    // 2. session에서 나간 사용자 삭제
    session.on('streamDestroyed', (event: StreamEvent) => {
      if (event.stream.typeOfVideo === 'CUSTOM') {
        deleteSubscriber(event.stream.streamManager);
        console.log('사용자 삭제 ing ', subscribers);
      }
    });

    // 3. 예외처리
    session.on('exception', (exception: ExceptionEvent) => {
      console.warn(exception);
    });
  }, [subscribers]);

  // 새로고침
  const beforeUnLoad = (event: BeforeUnloadEvent) => {
    console.log('beforeUnLoad 새로고침이 일어났어요');
    event.stopPropagation();
    event.returnValue = '';
    leaveSession();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnLoad);

    return () => {
      window.removeEventListener('beforeunload', beforeUnLoad);
    };
  });

  const recordArray: Blob[] = [];

  // 방 생성 로직 (publish 과정)
  const joinSession = () => {
    if (!OV) return;
    if (!session) return;

    console.log('joinSession 시작해주겠니...?');

    // 4. session에 connect 과정
    const connection = async (): Promise<void> => {
      // 사용자의 카메라에서 가져온 스트림에 대한 설정
      let cameraStream = {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: undefined, // The source of video. If undefined default webcam
        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: false,
        contentHint: 'grid',
        audio: true,
      };

      // 사용자가 방송하는(퍼블리싱하는) 스트림에 대한 설정
      let publisherStream = {
        audioSource: undefined,
        videoSource: undefined as MediaStreamTrack | undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: '1280x720',
        frameRate: 60,
        insertMode: 'APPEND',
        mirror: true,
        contentHint: 'grid',
      };
      // 4.1 token 가져오기
      getToken().then(async (token: string) => {
        console.log('가져온 token', token);

        session
          .connect(token, { clientData: initMyData.myUserName })
          .then(async () => {
            // 4.2 user media 객체 생성
            OV.getUserMedia(cameraStream).then((mediaStream: any) => {
              const videoTrack = mediaStream.getVideoTracks()[0];
              publisherStream.videoSource = videoTrack;
              console.log('publisherStream', publisherStream);
              const newPublisher = OV.initPublisher(initMyData.myUserName as string, publisherStream);

              newPublisher.once('accessAllowed', async () => {
                await session.publish(newPublisher); // 개별 사용자가 개시하는 스트림
                setPublisher(newPublisher); //
              });

              // 신고 녹화 시작
              const options = {
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000,
              };

              const mediaRecorder = new MediaRecorder(mediaStream, options); // MediaRecorder 객체 생성

              // 데이터를 수집하여 사용 가능할 때
              mediaRecorder.ondataavailable = (event) => {
                console.log('event.data', event.data);
                recordArray.push(event.data);
              };

              // 녹화 종료했을 때
              mediaRecorder.onstop = (event) => {
                console.log('녹화를 종료합니다.', event);
                const recordBlob = new Blob(recordArray, { type: 'video/mp4' });
                const file = blobToFile(recordBlob, 'recordingFile.mp4'); // blob 데이터 파일로 변환

                sendRecordingFile(file);
              };

              console.log('녹화를 시작할게요');
              mediaRecorder.start(); // 녹화시작

              // 여기서는 일단 5분 녹화
              setTimeout(
                () => {
                  mediaRecorder.stop(); // 녹화 종료
                },
                5 * 60 * 1000
              ); // 5분

              // 신고 끝
            });
          })
          .catch((error: any) => {
            console.log('세션 연결과정에서 에러 떴어요', error.code, error.message);
          });
      });
    };
    connection();

    // subscribe 과정
    // 다른 사용자 파악
    // 1. session에 참가한 사용자 추가
    session.on('streamCreated', (event: StreamEvent) => {
      console.log('제가 들어왔어요', event);

      const subscriberOptions = {
        insertMode: 'APPEND',
        mirror: false,
        contentHint: 'grid',
      };

      const newSubscriber = session.subscribe(event.stream, JSON.parse(event.stream.connection.data).clientData, subscriberOptions);
      console.log('입장한 사용자 데이터', JSON.parse(event.stream.connection.data));
      const newSubscribers = [...subscribers, newSubscriber];

      setSubscribers(newSubscribers);
      console.log('들어온 사용자 subscribers ', newSubscribers);
    });
  };

  /// 세션에서 나간 사람들 삭제
  const deleteSubscriber = (streamManager: StreamManager) => {
    const prevSubscribers = subscribers;
    let index = -1;
    if (streamManager instanceof Subscriber) {
      index = prevSubscribers.indexOf(streamManager, 0);
    }
    if (index > -1) {
      prevSubscribers.splice(index, 1);
      setSubscribers([...prevSubscribers]);
    }
  };

  // 세션 종료
  const leaveSession = () => {
    console.log('세션 남아있나요? 남아있으면 종료해주세요', session);
    if (session) {
      session.disconnect();
    }

    // 상태값 초기화
    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setInitMyData({ mySessionId: '', myUserName: '' });
    setPublisher(undefined);
  };

  // token 가져오기 > 백에서 가져올거임
  const getToken = async () => {
    try {
      const data = await getCoupleRoomToken({ coupleId: 1 });
      // console.log('data token 받았어요', data.token);
      // console.log('data 받아', data);
      // console.log('data ---- getToken', data.videoId, data.name);

      // const updateData: MyData = {
      //   mySessionId: data.videoId,
      //   myUserName: data.name,
      // };
      // console.log('getToken ---  updateData', updateData);

      // setInitMyData(updateData);

      // console.log('getToken', initMyData);
      // return data.token;

      return data.token;
    } catch (error) {
      console.log('token 에러', error);
    }
  };

  return (
    <CoupleMeetingRoomContainer>
      <NoticeContainer>
        <NoticeBox noticeText={notice} />
        <Button backgroundColor='#e1a4b4' width='145px' height='43px' borderRadius='30px' fontColor='white' onButtonClick={handleLeaveBtn}>
          커플 게임
        </Button>
      </NoticeContainer>
      <VideoContainer>
        {session && (
          <>
            <>
              {publisher !== undefined && (
                <PublisherStreamContainer>
                  <VideoCard streamManager={publisher} userType={0} width={'65vw'} height={'75vh'}>
                    {/* <HashtagButton backgroundColor='#E1A4B4'>{JSON.parse(JSON.parse(subscriber.stream.connection.data).clientData).myGender}</HashtagButton> */}
                    <UserInfoContainer>
                      <HashtagButton backgroundColor='#E1A4B4' padding='10px 30px' fontSize='18px'>
                        {initMyData.myUserName}
                      </HashtagButton>
                    </UserInfoContainer>
                  </VideoCard>
                </PublisherStreamContainer>
              )}
            </>
            <>
              {subscribers.map((sub, i) => (
                <StreamContainer key={i}>
                  <VideoCard streamManager={sub} userType={1} width='360px' height='270px'>
                    <UserInfoContainer>
                      <HashtagButton backgroundColor='#E1A4B4' padding='10px 30px' fontSize='18px'>
                        {JSON.parse(sub.stream.connection.data).clientData}
                      </HashtagButton>
                    </UserInfoContainer>
                  </VideoCard>
                </StreamContainer>
              ))}
            </>
          </>
        )}
      </VideoContainer>

      <VideoButtonContainer>
        <VideoButton exitModalOpen={exitModalOpen} setExitModalOpen={setExitModalOpen} />
      </VideoButtonContainer>
      <MyModal isOpen={exitModalOpen} setIsOpen={setExitModalOpen}>
        <ExitCoupleModal handleLeave={handleLeaveBtn} exitModalOpen={exitModalOpen} setExitModalOpen={setExitModalOpen} />
      </MyModal>
    </CoupleMeetingRoomContainer>
  );
};

////////////////////////////////////////////////////
/////////// styled component //////////////////////
///////////////////////////////////////////////////

const CoupleMeetingRoomContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 0 20px 0;
`;

const NoticeContainer = styled.div`
  width: 100%;
  padding: 15px 60px;
  display: flex;
  justify-content: space-between;
`;

const VideoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const PublisherStreamContainer = styled.div``;
const StreamContainer = styled.div`
  position: absolute;
  right: 20px;
  bottom: 0;
`;

const VideoButtonContainer = styled.div`
  margin-top: 3px;
  display: flex;
  justify-content: center;
`;

const UserInfoContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
`;
export default CoupleMeeting;
