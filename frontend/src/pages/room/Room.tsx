import React, { useEffect, useState } from 'react';
import MeetingWaiting from '../../modules/roomModules/MeetingWaiting';
import MeetingRoom from '../../modules/roomModules/MeetingRoom';
import MeetingReady from '../../modules/roomModules/MeetingReady';
import { useRecoilState } from 'recoil';
import { MatchingInfo, matchingInfoState } from '../../recoil/atoms/matchingState';
import { OpenVidu, Subscriber, Publisher, Session as OVSession, StreamManager, StreamEvent, ExceptionEvent } from 'openvidu-browser';
import { matchingCheck } from '../../apis/services/matching/matching';
import { getSessionId } from '../../utils/numberUtil';

const Room = () => {
  const [state, setState] = useState('loading');
  const [matchingInfo, setMatchingInfo] = useRecoilState<MatchingInfo>(matchingInfoState);

  // 1. 필요한 상태 정의
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [session, setSession] = useState<OVSession | undefined>(undefined);
  const [initMyData, setInitMyData] = useState({
    mySessionId: '',
    myUserName: matchingInfo.randomName,
    myGender: matchingInfo.gender,
    myBirth: matchingInfo.birth,
    myArea: matchingInfo.area,
    myJob: matchingInfo.job,
    myTag: matchingInfo.tag,
    myUserId: matchingInfo.userId,
  });
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined); // 방 생성한 사람
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]); // 나를 제외한 참여자들

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
      console.log('initOV가 되니? 안되는 것 같은데..??????');
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
        console.log('event.stream.typeOfVideo가 뭔디', event.stream.typeOfVideo);
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
    console.log('beforeUnLoad 새로고침이 일어났지');
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

  // 방 생성 로직 (publish 과정)
  const joinSession = () => {
    // 1. OpenVidu 객체 생성
    if (!OV) return;
    if (!session) return;

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
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: true,
        contentHint: 'grid',
      };

      // 4.1 token 가져오기
      getToken().then(async (token: string) => {
        console.log('가져온 token', token);
        session
          .connect(token, { clientData: JSON.stringify(initMyData) })
          .then(async () => {
            // 4.2 user media 객체 생성
            OV.getUserMedia(cameraStream).then((mediaStream) => {
              const videoTrack = mediaStream.getVideoTracks()[0];
              publisherStream.videoSource = videoTrack;
              console.log('publisherStream', publisherStream);
              const newPublisher = OV.initPublisher(JSON.stringify(initMyData), publisherStream);
              console.log('newPublisher가 뭐야', newPublisher);

              newPublisher.once('accessAllowed', async () => {
                await session.publish(newPublisher); // 개별 사용자가 개시하는 스트림

                setPublisher(newPublisher); //

                console.log(publisher?.stream.connection.data);
              });
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
        subscriberSessionId: event.stream.connection.connectionId,
        subscriberUserName: event.stream.connection.data,
      };

      const newSubscriber = session.subscribe(event.stream, JSON.parse(event.stream.connection.data).clientData, subscriberOptions);
      const newSubscribers = [...subscribers, newSubscriber];
      console.log(newSubscriber);
      console.log(newSubscriber.stream.connection);

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
    setInitMyData({ mySessionId: '', myUserName: '', myGender: false, myArea: '', myBirth: '', myJob: '', myTag: [], myUserId: '' });
    setPublisher(undefined);
  };

  // token 가져오기 (recoil에 저장된 token에서)
  const getToken = async () => {
    try {
      const data = await matchingCheck();
      const sessionId = getSessionId(data.data.token);
      const updateInitMyData = {
        ...initMyData,
        mySessionId: String(sessionId),
        myUserName: matchingInfo.randomName,
      };
      setInitMyData(updateInitMyData);
      return data.data.token;
    } catch (error) {
      console.log('token 에러', error);
    }
  };

  return (
    <>
      {state === 'loading' && <MeetingWaiting streamManager={publisher} userType={0} state={state} setState={setState} />}
      {state.includes('step') && <MeetingRoom publisher={publisher} subscribers={subscribers} state={state} setState={setState} />}
      {state.includes('ready') && <MeetingReady streamManager={publisher} userType={0} state={state} setState={setState} />}
      {state === '' && <div>끝났대...</div>}
    </>
  );
};

export default Room;
