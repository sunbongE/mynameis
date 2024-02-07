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

const StyledTimer = styled.div`
  width: 85.22px;
  height: 28.755px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  color: #000;
  font-family: Pretendard;
  font-size: 19.718px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Timer = (props: TimerProps) => {
  const [min, setMin] = useState<number>(Math.floor(props.time / 60));
  const [sec, setSec] = useState<number>(props.time % 60);

  const setState = () => {
    if (props.state === 'step1') {
      props.setState('step12');
    } else if (props.state === 'step12') {
      props.setState('step12_vote');
    } else if (props.state === 'step12_vote') {
      props.setState('step123');
    } else if (props.state === 'step123') {
      props.setState('step123_vote');
    } else if (props.state === 'step123_vote') {
      props.setState('ready');
    } else if (props.state === 'ready') {
      props.setState('step1234');
    } else if (props.state === 'step1234') {
      props.setState('step12345');
    } else if (props.state === 'step12345') {
      props.setState('step12345_vote');
    } else if (props.state === 'step12345_vote') {
      props.setState('');
    }
  };

  const repeatTimer = (initialTime: number, repeatCount: number) => {
    let i = 0;
    let currentTime = initialTime;

    const intervalId = setInterval(() => {
      currentTime -= 1;
      setMin(Math.floor(currentTime / 60));
      setSec(currentTime % 60);

      if (currentTime === 0 && i < repeatCount - 1) {
        i += 1;
        currentTime = initialTime + 1;
        // console.log(i + 1);
      } else if (currentTime === 0 && i === repeatCount - 1) {
        clearInterval(intervalId);
        setState();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    const initialTime = props.time;
    let currentTime = initialTime;

    setMin(Math.floor(currentTime / 60));
    setSec(currentTime % 60);

    if (props.repeatCount === 4) {
      repeatTimer(initialTime, 4);
    } else if (props.repeatCount === 3) {
      repeatTimer(initialTime, 3);
    } else {
      repeatTimer(initialTime, 1);
    }
  }, [props.time, props.repeatCount]);

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

export default Timer;
