import {atom} from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const TokenAtom = atom({
  key: 'TokenAtom',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

// export const IsLoginAtom = atom({
//   key: 'isLoginAtom',
//   default: false,
// });