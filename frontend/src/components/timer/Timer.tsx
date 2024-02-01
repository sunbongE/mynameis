import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Icon from '../icon/Icon';
import { TimerIcon } from '../../config/IconName';

interface TimerProps {
  time: number;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  repeatCount: number;
}

const Timer = (props: TimerProps) => {
  const [min, setMin] = useState<number>(Math.floor(props.time / 60));
  const [sec, setSec] = useState<number>(props.time % 60);

  const repeat4TimesTimer = (initialTime: number, currentTime: number) => {
    let i = 0;
    const intervalId = setInterval(() => {
      currentTime -= 1; // 시간 감소 시키기
      setMin(Math.floor(currentTime / 60));
      setSec(currentTime % 60);

      if (currentTime === 0 && i < 3) {
        i += 1;
        currentTime = initialTime;
      } else if (currentTime === 0 && i === 3) {
        if (props.state === 'step1') {
          // 1단계인 경우
          props.setState('step12'); // 2단계로 변경
        } else if (props.state === 'step123') {
          // 3단계인 경우
          // props.setState('step123_vote'); // 이름 공개 투표 시작
          props.setState('ready'); // 일단 준비화면으로 가보자
        } else if (props.state === 'step1234') {
          // 4단계인 경우
          props.setState('step12345'); // 5단계로 변경
        }

        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  };

  const repeat3TimesTimer = (initialTime: number, currentTime: number) => {};

  const singleTimer = (initialTime: number, currentTime: number) => {
    const intervalId = setInterval(() => {
      currentTime -= 1; // 시간 감소 시키기
      setMin(Math.floor(currentTime / 60));
      setSec(currentTime % 60);

      if (currentTime === 0) {
        if (props.state === 'step12') {
          // props.setState('step12_vote'); // 익명 투표 시작 (일단 123ㅇ로 이동하자)
          props.setState('step123');
        } else if (props.state === 'step12_vote') {
          props.setState('step123'); // 3단계로 이동
        } else if (props.state === 'step123_vote') {
          props.setState('ready'); // 준비화면으로 이동
        } else if (props.state === 'ready') {
          props.setState('step1234');
        } else if (props.state === 'step12345_vote') {
          props.setState(''); // 최종 투표 끝나면.. 어디로?
        }
        clearInterval(intervalId);
      }
    }, 1000);
  };

  useEffect(() => {
    const initialTime = props.time; // 초기에 주어진 시간
    let currentTime = initialTime; // 줄어들 시간
    if (props.repeatCount === 4) {
      repeat4TimesTimer(initialTime, currentTime);
    } else if (props.repeatCount === 3) {
      repeat3TimesTimer(initialTime, currentTime);
    } else {
      singleTimer(initialTime, currentTime);
    }
  }, [props.time]);

  return (
    <StyledTimer>
      <Icon src={TimerIcon} width='20px' height='20px' />
      {padNumber(min, 2)}:{padNumber(sec, 2)}
    </StyledTimer>
  );
};

function padNumber(number: number, width: number) {
  return String(number).padStart(width, '0');
}

//////////////////////////////////
////// styled component //////////
//////////////////////////////////

const StyledTimer = styled.div`
  width: 85.22px;
  height: 28.755px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-family: 'Pretendard SemiBold';
  font-size: 16px;
`;

export default Timer;
