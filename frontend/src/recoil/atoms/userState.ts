import { atom } from 'recoil';

export interface UserInfo {
  userId: string;
  couple: boolean; // 커플 여부 coupleId가 null이 아니면 couple
}
export const userInfoState = atom<UserInfo>({
  key: 'userInfoState',
  default: {
    userId: '1',
    couple: true,
  },
});
