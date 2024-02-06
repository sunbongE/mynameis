import { atom } from 'recoil';

export interface ChatMessage {
  msg: string;
  time: string;
  role: string;
}

export const chatMessagesState = atom<ChatMessage[]>({
  key: 'chatMessagesState',
  default: [],
});

/*
사용법 예시
const [text, setText] = useRecoilState(textState);
*/
