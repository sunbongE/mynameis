import { selector } from 'recoil';
import { TokenAtom } from "../atoms/userAuthAtom";
import Cookies from 'js-cookie';

export const isLoginSelector = selector({
    key: 'isLoginSelector',
    get: ({ get }) => !!get(TokenAtom),
    set: ({ set }, newValue) => {
      if (!newValue) {
        // 로그아웃 상태에서 호출될 때 TokenAtom 초기화
        set(TokenAtom, undefined);
        Cookies.remove('accessToken');
      }
    },
  });


