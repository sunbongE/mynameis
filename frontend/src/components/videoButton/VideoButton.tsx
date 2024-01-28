import { useState } from 'react';
import styled from 'styled-components';
import Icon from '../icon/Icon';
import Logo from '../icon/Logo';
import { EtcDots, Vector, MicOn, MicOff, RoomOut, VideoOn, VideoOff } from '../../config/IconName';


const StyleVideoButtonContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 39px;
`;

const StylevideoButtonItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 87px;
  height: 48px;
  border-radius: var(--Radius-1, 8px);
  gap: 5px;
`;

function VideoButton() {
  const [isMicRunning, setIsMicRunning] = useState(false);
  const [isVideoRunning, setIsVideoRunning] = useState(false);

  const handleMicToggle = () => {
    setIsMicRunning((prev) => (!prev))
  }

  const handleVideoToggle = () => {
    setIsVideoRunning((prev) => (!prev))
  }


  return (
    <StyleVideoButtonContainer>
      <br />
      <StylevideoButtonItem style={{background:'#2E3038'}} >
        <div onClick={handleMicToggle}>
          {isMicRunning ? <Icon src={MicOn} /> : <Icon src={MicOff} />}
        </div>
        <Icon src={Vector} />
        <Icon src={EtcDots} />
      </StylevideoButtonItem>

      <StylevideoButtonItem style={{background:'#2E3038'}} >
        <div onClick={handleVideoToggle}>
          {isVideoRunning ? <Icon src={VideoOn} /> : <Icon src={VideoOff} />}
        </div>
        <Icon src={Vector} />
        <Icon src={EtcDots} />
      </StylevideoButtonItem>

      <StylevideoButtonItem style={{background:'#FF4155'}} >
        <Icon src={RoomOut} />
        <Icon src={Vector} />
        <Icon src={EtcDots} />
      </StylevideoButtonItem>

    </StyleVideoButtonContainer>
  );
}

export default VideoButton