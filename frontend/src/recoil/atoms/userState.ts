import { userInfo } from 'os';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface UserInfo {
  userId: string;
  name: string;
  coin: number;
  gender: boolean;
  birth: string;
  area: string;
  job: string;
  tag: [] | null;
  religion: string;
  isValid: boolean;
  coupleId: null | string; // 커플 여부 coupleId가 null이 아니면 couple
}
export const userInfoState = atom<UserInfo | null>({
  key: 'userInfoState',
  default: {
    userId: '',
    name: '',
    coin: 0,
    gender: false,
    birth: '',
    area: '',
    job: '',
    tag: [],
    religion: '',
    isValid: false,
    coupleId: null,
  },
  effects_UNSTABLE: [persistAtom],
});
