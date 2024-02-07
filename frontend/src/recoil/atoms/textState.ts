import { atom } from 'recoil';

export interface ChatMessage {
  type: string;
  roomId: string;
  sender: string;
  msg: string;
}

export const chatMessagesState = atom<ChatMessage[]>({
  key: 'chatMessagesState',
  default: [],
});

/*
사용법 예시
const [text, setText] = useRecoilState(textState);
*/
