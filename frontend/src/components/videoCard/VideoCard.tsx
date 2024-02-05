import { StreamManager } from 'openvidu-browser';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

interface VideoCardProps {
  width: string;
  height: string;
  children?: React.ReactNode;
  streamManager: StreamManager | undefined;
  userType: number;
}

const StyledVideoCard = styled.div<VideoCardProps>`
  position: relative;
  width: ${(props) => (props.width ? props.width : '700px')};
  height: ${(props) => (props.height ? props.height : '350px')};

  /* border: 1px solid lightgray; */
  border: 1px solid black /* background:
    url(<path-to-image>),
    lightgray 0px -92.722px / 100% 197.778% no-repeat; */ & focus-within {
    border: 3px solid #3aff42;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 20px;
`;

/**
 * VideoCard 컴포넌트
 * -width: '2:2 화면 => 700px' , '준비화면 => 1184px'
 * -height: '2:2 화면 => 350px' , '준비화면 => 606px'
 * -backgroundColor: '#000000' 과 같이 색상 코드 지정
 * @author 승재홍
 * @param props
 * @returns
 */
function VideoCard(props: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (props.streamManager && videoRef.current) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props.streamManager]);

  return (
    <StyledVideoCard width={props.width} height={props.height} streamManager={props.streamManager} userType={0}>
      <StyledVideo autoPlay={true} ref={videoRef} width={'900'} height={'600px'}></StyledVideo>
      {props.children}
    </StyledVideoCard>
  );
}

export default VideoCard;
