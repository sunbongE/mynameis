

import styled from "styled-components";

interface VideoCardProps {
  width:string;
  height:string;
}


const StyledVideoCard = styled.div<VideoCardProps>`
  width: ${(props) => (props.width ? props.width : '700px')};
  height: ${(props) => (props.height ? props.height : '350px')};
  border-radius: 20px;
  background: url(<path-to-image>), lightgray 0px -92.722px / 100% 197.778% no-repeat;

  & focus-within {
    border: 3px solid #3AFF42;
  }
`


/**
 * VideoCard 컴포넌트
 * -width: '2:2 화면 => 700px' , '준비화면 => 1184px'
 * -height: '2:2 화면 => 350px' , '준비화면 => 606px'
 * -backgroundColor: '#000000' 과 같이 색상 코드 지정
 * @author 승재홍
 * @param props
 * @returns
 */
function VideoCard (props:VideoCardProps) {

  return (
    <StyledVideoCard width={props.width} height={props.height}>

    </StyledVideoCard>
  )

}

export default VideoCard