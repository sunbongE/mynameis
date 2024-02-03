import { atom, selector } from 'recoil';

export const TokenAtom = atom({
    key:"TokenAtom",
    default:undefined,
})

const isLoginSelector = selector({
  key: 'isLoginSelector',
  get: ({get}) => !!get(TokenAtom),
//   set: ({set}, newValue) => set(myAtom, newValue),
});

export const IsLoginAtom= atom({
    key:'isLoginAtom',
    default:false,   
})

