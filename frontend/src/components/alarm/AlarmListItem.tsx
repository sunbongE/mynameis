import styled from "styled-components";
import Logo from '../icon/Logo'
import Icon from "../icon/Icon";
import { Alarm } from '../../config/IconName'

interface AlarmProps {
    id:number,
    text:string,
}


const StyleAlarmListItem = styled.div`
    display: flex;
    width: 250px;
    height: 36.8px;
    padding: 10.6px 0px 11.199px 8.8px;
    align-items: flex-start;
    gap: 3.2px;
    flex-shrink: 2;
    border-radius: 8px;
    background: #ECECEC;

`

const StyleAlarmText = styled.p`
    color: #000; 
    width: 100%;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Pretendard;
    font-size: 9.6px;
    font-style: normal;
    font-weight: 600;
    line-height: 14.4px; /* 150% */
    letter-spacing: 0.722px;
    text-transform: uppercase;

`


function AlarmListItem (props:AlarmProps) {

    return (
        <>
        <StyleAlarmListItem>
            <Icon src={Alarm} />
            <StyleAlarmText>{props.text}</StyleAlarmText>
        </StyleAlarmListItem>
        </>
    )
}

export default AlarmListItem