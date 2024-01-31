import { atom } from 'recoil';

export interface ChatMessage {
  msg: string;
  time: string;
  role: string;
}

export const chatMessagesState = atom<ChatMessage[]>({
  key: 'chatMessagesState',
  default: [
    {
      msg: '지금',
      time: '12:35',
      role: 'sender',
    },
    {
      msg: '너무 졸린데요?',
      time: '12:36',
      role: 'sender',
    },
    {
      msg: '메인 화면 만들어야하는데요...',
      time: '12:37',
      role: 'receiver',
    },
    {
      msg: '저 언제 자죠...',
      time: '12:37',
      role: 'sender',
    },
  ],
});

/*
사용법 예시
const [text, setText] = useRecoilState(textState);
*/
