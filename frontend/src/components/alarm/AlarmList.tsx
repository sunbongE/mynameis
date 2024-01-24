import styled from "styled-components";

import AlarmListItem from "./AlarmListItem";


const StyleAlarmList = styled.div`

    display: inline-flex;
    width: 294.4px;
    height: 192.8px;
    flex-direction: column;
    align-items: center;

    border-radius: 8px;
    box-shadow: 0px 2.36px 6.609px 0px rgba(8, 15, 52, 0.04), 0px 0.472px 0.472px 0px rgba(23, 15, 73, 0.04), 0px 0px 0.472px 0px rgba(23, 15, 73, 0.03);
    border: 1.5px solid #E1A3B3;
    gap: 10px;
`


function AlarmList() {

    const alarmitems = [
        {
            id: 0,
            text: '김아현님과 송강님이 커플이 되었습니다.'
        },
        {
            id: 1,
            text: '김아현님과 송강님이 이별하셨습니다'
        },
        {
            id: 2,
            text: '김아현님과 서강준님이 커플이 되었습니다.'
        }
    ]

    return (

        <StyleAlarmList>
            <h1>알림함</h1>
            {alarmitems.map((item) =>
                <AlarmListItem key={item.id} id={item.id} text={item.text} />
            )}
        </StyleAlarmList>
    )
}

export default AlarmList