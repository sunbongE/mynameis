import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledStopwatch = styled.div`

color: #333;
font-family: Pretendard;
font-size: 21.6px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

function Stopwatch() {
  const [Time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 함

  return (
    <StyledStopwatch>
      {padNumber(Math.floor(Time / 3600), 2)}:
      {padNumber(Math.floor((Time % 3600) / 60), 2)}:
      {padNumber(Time % 60, 2)}
    </StyledStopwatch>
  );
}

function padNumber(number:any, width:any) {
  return String(number).padStart(width, '0');
}

export default Stopwatch;
