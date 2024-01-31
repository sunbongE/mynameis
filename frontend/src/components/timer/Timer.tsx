import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Icon from '../icon/Icon';
import { TimerIcon } from '../../config/IconName';

const StyledTimer = styled.div`
  width: 85.22px;
  height: 28.755px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

function Timer() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(20);

  useEffect(() => {
    const initialTime = min * 60 + sec;
    let currentTime = initialTime;

    // const intervalId = setInterval(() => {
    //   currentTime -= 1;
    //   setMin(Math.floor(currentTime / 60));
    //   setSec(currentTime % 60);

    //   if (currentTime <= 1) {
    //     console.log('타임 아웃');
    //     clearInterval(intervalId);
    //   }
    // }, 1000);

    // return () => clearInterval(intervalId);
  }, [min, sec]);

  return (
    <StyledTimer>
      <Icon src={TimerIcon} width='20px' height='20px' />
      {padNumber(min, 2)}:{padNumber(sec, 2)}
    </StyledTimer>
  );
}

function padNumber(number: any, width: any) {
  return String(number).padStart(width, '0');
}

export default Timer;
