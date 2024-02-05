import React, { useState, useEffect } from 'react';
import VideoCard from '../../components/videoCard/VideoCard';
import styled from 'styled-components';
import { OpenVidu, Subscriber, Publisher, Session as OVSession, StreamManager, StreamEvent, ExceptionEvent } from 'openvidu-browser';
import { getCoupleRoomToken } from '../../apis/services/user/room';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { createConstructor } from 'typescript';
import { matchingCheck } from '../../apis/services/matching/matching';
const StyledMeetingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const VideoContainer = styled.div``;
const StreamContainer = styled.div``;

interface MyData {
  mySessionId: String;
  myUserName: String;
}

const CoupleMeeting = () => {
  // 1. 필요한 상태 정의
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [session, setSession] = useState<OVSession | undefined>(undefined);
  const [initMyData, setInitMyData] = useState<MyData>({
    mySessionId: '',
    myUserName: '김아현',
  });
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | undefined>(undefined); // 방장?!
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined); // 방 생성한 사람
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]); // 나를 제외한 참여자들

  const navigate = useNavigate();

  // 방 나가기 버튼
  const handleLeaveBtn = async () => {
    console.log('이 방 제가 나가보겠습니다.', session);
    await leaveSession();
    console.log('leaveSession publisher ', publisher);
    console.log('leaveSession subscribers ', subscribers);
    navigate('/');
  };

  // sessionId 받아오기 > backend에서 받아옴
  useEffect(() => {
    if (initMyData.mySessionId === '') {
      joinSession();
    }

    console.log('mySessionId', initMyData.mySessionId);
  }, [initMyData.mySessionId]);

  // 새로고침
  const beforeUnLoad = (e: BeforeUnloadEvent) => {
    e.stopPropagation();
    e.returnValue = '';
    leaveSession();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnLoad);

    return () => {
      window.removeEventListener('beforeunload', beforeUnLoad);
    };
  }, []);

  // 방 생성 로직 (publish 과정)
  const joinSession = () => {
    console.log('왜 시작을 못하니');
    // 1. OpenVidu 객체 생성
    const nOV = new OpenVidu();
    // openvidu log 멈춰!!
    nOV.enableProdMode();

    // 2. Session 초기화
    const nSession = nOV.initSession();

    // 3. 미팅을 종료하거나 뒤로가기 등의 이벤트를 통해 세션을 disconnect 해주기 위해 state에 저장
    setOV(nOV);
    setSession(nSession);

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
        mirror: true,
        contentHint: 'grid',
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
        nSession
          .connect(token, { clientData: initMyData.myUserName })
          .then(async () => {
            // 4.2 user media 객체 생성
            nOV.getUserMedia(cameraStream).then((mediaStream) => {
              const videoTrack = mediaStream.getVideoTracks()[0];
              publisherStream.videoSource = videoTrack;
              console.log('publisherStream', publisherStream);
              const newPublisher = nOV.initPublisher(initMyData.myUserName as string, publisherStream);

              newPublisher.once('accessAllowed', async () => {
                await nSession.publish(newPublisher); // 개별 사용자가 개시하는 스트림
                setPublisher(newPublisher); //
              });
            });
          })
          .catch((error: any) => {
            console.log('세션 연결과정에서 에러 떴어요', error.code, error.message);
          });
      });
    };

    // subscribe 과정
    // 다른 사용자 파악
    // 1. session에 참가한 사용자 추가
    nSession.on('streamCreated', (event: StreamEvent) => {
      console.log('제가 들어왔어요', event);
      const subscriberOptions = {
        insertMode: 'APPEND',
        mirror: true,
        contentHint: 'grid',
        subscriberName: '태호',
      };

      const newSubscriber = nSession.subscribe(event.stream, JSON.parse(event.stream.connection.data).clientData, subscriberOptions);
      const newSubscribers = [...subscribers, newSubscriber];

      setSubscribers(newSubscribers);
      console.log('들어온 사용자 subscribers ', newSubscribers);
    });
    // 2. session에서 나간 사용자 삭제
    nSession.on('streamDestroyed', (event: StreamEvent) => {
      if (event.stream.typeOfVideo === 'CUSTOM') {
        console.log('event.stream.typeOfVideo가 뭔디', event.stream.typeOfVideo);
        console.log('event.stream.streamManager', event.stream.streamManager);
        deleteSubscriber(event.stream.streamManager);
        console.log('사용자 삭제 ing ', subscribers);
      }
    });

    // 3. 예외처리
    nSession.on('exception', (exception: ExceptionEvent) => {
      console.warn(exception);
    });

    connection();
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
    setInitMyData({ mySessionId: '', myUserName: '김아현' });
    setPublisher(undefined);
  };

  // token 가져오기 > 백에서 가져올거임
  const getToken = async () => {
    try {
      const data = await getCoupleRoomToken({ coupleId: 1 });
      // const data = await matchingCheck();
      console.log(data);
      console.log('data token 받았어요', data.token);
      console.log('data 받아', data);
      setInitMyData({
        mySessionId: data.videoId,
        myUserName: data.randomName,
      });
      return data.token;
    } catch (error) {
      console.log('token 에러', error);
    }
  };

  return (
    <StyledMeetingContainer>
      {session && (
        <VideoContainer>
          {publisher !== undefined && (
            <StreamContainer>
              <VideoCard streamManager={publisher} userType={0} width='500px' height='400px'>
                <div style={{ zIndex: 100, position: 'absolute' }}>{initMyData.myUserName}</div>
              </VideoCard>
            </StreamContainer>
          )}
          {subscribers.map((sub, i) => (
            <StreamContainer key={i}>
              <span>{sub.id}</span>
              <VideoCard streamManager={sub} userType={1} width='400px' height='300px'>
                <div style={{ zIndex: 100, position: 'absolute' }}>{'아아'}</div>
              </VideoCard>
            </StreamContainer>
          ))}
        </VideoContainer>
      )}
      <Button backgroundColor='#e1a4b4' width='168px' height='48px' borderRadius='10px' fontColor='white' onButtonClick={handleLeaveBtn}>
        방 나갈래
      </Button>
    </StyledMeetingContainer>
  );
};

export default CoupleMeeting;
