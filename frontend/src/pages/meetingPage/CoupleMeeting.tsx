import React, { useState, useEffect } from 'react';
import VideoCard from '../../components/videoCard/VideoCard';
import styled from 'styled-components';
import { OpenVidu, Subscriber, Publisher, Session as OVSession, StreamManager, StreamEvent, ExceptionEvent } from 'openvidu-browser';
import { getCoupleRoomToken } from '../../apis/services/user/room';

const StyledMeetingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoupleMeeting = () => {
  // 1. 필요한 상태 정의
  const [mySessionId, setMySessionId] = useState<string>(''); // 방번호
  const [myUserName, setMyUserName] = useState('참여자' + Math.floor(Math.random() * 100)); // 사용자 이름
  const [session, setSession] = useState<OVSession | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | null>(null); // 방장?!
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined); // 방 생성한 사람
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]); // 나를 제외한 참여자들

  // sessionId 받아오기 > backend에서 받아옴
  useEffect(() => {
    if (mySessionId === '') {
      joinSession();
    } else {
      console.log('mySessionId', mySessionId);
    }
  }, [mySessionId]);

  useEffect(() => {
    const handleBeforeUnload = (event: Event) => {
      leaveSession();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      leaveSession();
    };
  }, []);

  const onbeforeunload = () => {
    leaveSession();
  };

  // const handleChangeSessionId = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setMySessionId(event.target.value);
  // };

  // const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setMyUserName(event.target.value);
  // };

  // const handleMainVideoStream = (stream: any) => {
  //   if (mainStreamManager !== stream) {
  //     setMainStreamManager(stream);
  //   }
  // };

  // 방 생성 로직
  const joinSession = () => {
    console.log('방 생성 시작');
    console.log('왜 시작을 못하니');
    // 1. OpenVidu 객체 생성
    const nOV = new OpenVidu();

    // 2. Session 초기화
    const nSession = nOV.initSession();

    console.log('new session ', nSession);
    setSession(nSession);

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
    };

    // 사용자가 방송하는(퍼블리싱하는) 스트림에 대한 설정
    let publisherStream = {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: true,
      publishVideo: true,
      resolution: '1280x720',
      frameRate: 60,
      insertMode: 'APPEND',
      mirror: false,
    };

    const connection = async (): Promise<void> => {
      try {
        const token: string = await getToken();
        console.log('가져온 token', token);

        nSession.connect(token, { clientData: myUserName }).then(async () => {
          console.log('새로운 session 연결', token);
          nOV.getUserMedia(cameraStream).then((mediaStream) => {
            const videoTrack = mediaStream.getVideoTracks()[0];
            const newPublisher = nOV.initPublisher(myUserName, {
              audioSource: undefined,
              videoSource: videoTrack,
              publishAudio: true,
              publishVideo: true,
              resolution: '1280x720',
              frameRate: 60,
              insertMode: 'APPEND',
              mirror: true,
            });
            nSession.publish(newPublisher); // 개별 사용자가 개시하는 스트림
            setPublisher(newPublisher); //
          });
        });
      } catch (error) {
        console.warn('connection 에러', error);
      }
    };

    // 다른 사용자 파악
    // 1. session에 참가한 사용자 추가
    nSession.on('streamCreated', (event: StreamEvent) => {
      console.log('제가 들어왔어요', event);
      const subscriber = nSession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    // 2. session에서 나간 사용자 삭제
    nSession.on('streamDestroyed', (event: StreamEvent) => {
      deleteSubscriber(event.stream.streamManager);
    });

    // 3. 예외처리
    nSession.on('exception', (exception: ExceptionEvent) => {
      console.warn(exception);
    });

    connection();
  };

  /// 방 세션에서 나간 사람들 삭제
  const deleteSubscriber = (streamManager: StreamManager) => {
    setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
  };

  // 세션 종료
  const leaveSession = () => {
    if (session) {
      // 세션 존재하면 연결 끊어
      session.disconnect();
    }

    // 상태값 초기화
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('');
    setMyUserName('영호');
    setPublisher(undefined);
  };

  // token 가져오기 > 백에서 가져올거임
  const getToken = async () => {
    try {
      const data = await getCoupleRoomToken({ coupleId: 1 });
      // console.log('data token 받았어요', data.token);
      console.log('data 받아', data);
      setMySessionId(data.videoId);
      return data.token;
    } catch (error) {
      console.log('token 에러', error);
    }
  };

  return (
    <StyledMeetingContainer>
      <VideoCard width='900px' height='600px' streamManager={publisher} userType={0} />
    </StyledMeetingContainer>
  );
};

export default CoupleMeeting;
