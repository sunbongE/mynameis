import { selector } from 'recoil';
import { TokenAtom } from "../atoms/userAuthAtom";
import Cookies from 'js-cookie';
import { userInfoState } from '../atoms/userState';

export const isLoginSelector = selector({
    key: 'isLoginSelector',
    get: ({ get }) => !!get(TokenAtom),
    set: ({ set }, newValue) => {
      if (!newValue) {
        // 로그아웃 상태에서 호출될 때 TokenAtom, 쿠키, 로컬스토리지, userInfoState 초기화
        set(TokenAtom, undefined);
        Cookies.remove('accessToken');
        localStorage.clear();
        set(userInfoState, {
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
        })
      }
    },
  });


