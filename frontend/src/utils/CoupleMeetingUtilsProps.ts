import { OpenVidu, Subscriber, Publisher, Session as OVSession, StreamManager, StreamEvent, ExceptionEvent } from 'openvidu-browser';
import { MyData } from '../pages/meetingPage/CoupleMeeting';

export interface CoupleMeetingUtilsProps {
  setOV: React.Dispatch<React.SetStateAction<OpenVidu | null>>;
  setSession: React.Dispatch<React.SetStateAction<OVSession | undefined>>;
  setSubscribers: React.Dispatch<React.SetStateAction<Subscriber[]>>;
  setPublisher: React.Dispatch<React.SetStateAction<Publisher | undefined>>;
  setInitMyData: React.Dispatch<React.SetStateAction<MyData>>;
  subscribers: Subscriber[];
  initMyData: MyData;
}
