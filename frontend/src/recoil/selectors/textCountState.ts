import {selector} from "recoil";
import { textState } from "../atoms/textState";

const textCountState = selector({
    key : 'textCountState',
    get : ({get}) => {
        const text = get(textState);
        return text.length;
    }
})



/*
atom으로 분리한 상태를 변화시킴.

사용법 예시
const count = useRecoilValue(textCountState)
*/