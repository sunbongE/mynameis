import { atom } from 'recoil';

export interface MatchingInfo {
  name: string;
  coin: string;
  gender: boolean;
  birth: string;
  area: string;
  job: string;
  tag: Array<string>;
  religion: string;
  coupleId: number;
  userId: string;
  randomName: string;
  token: string;
}

export const matchingInfoState = atom<MatchingInfo>({
  key: 'matchingInfoState',
  default: {
    name: '',
    coin: '',
    gender: false,
    birth: '',
    area: '',
    job: '',
    tag: [],
    religion: '',
    coupleId: 0,
    userId: '',
    randomName: '',
    token: '',
  },
});
