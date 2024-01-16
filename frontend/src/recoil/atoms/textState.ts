import {atom} from "recoil";

export const textState = atom({
    key : "todoState",
    default : []
})




/*
사용법 예시
const [text, setText] = useRecoilState(textState);
*/