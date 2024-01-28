import styled from 'styled-components';
import { useState } from 'react';

interface ReportCheckBoxItemProps {
  reportTitle:string,
  reportContent:string,
}


const StyleReportCheckBox = styled.div`
  width: 459.2px;
  height: 42.559px;
  flex-shrink: 0;
  display: flex;
  gap: 10px;
`;

const StyleChecked = styled.input`


width: 19.04px;
  height: 19.04px;
  flex-shrink: 0;
  border-radius: 3.733px;
  border: 1.12px solid #333;
  background: var(--White, #fff);

`;

const StyleReportTitle = styled.div`
  color: #333;
  font-family: Pretendard;
  font-size: 17.92px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const StyleReportContent = styled.div`
  width: 428.96px;
  height: 16.8px;
  flex-shrink: 0;
  color: #000;
  font-family: Pretendard;
  font-size: 13.44px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function ReportCheckBoxItem(props:ReportCheckBoxItemProps) {
  const [isChecked, setIsChecked] = useState(false)

  function changeHandler() {
    setIsChecked((prev)=> !prev)
    console.log(isChecked)
  }

  return (
    <StyleReportCheckBox>
      <StyleChecked type="checkbox" checked={isChecked} onChange={changeHandler} />
      <div style={{ display: 'flex', flexDirection: 'column', gap:'5px' }}>
        <StyleReportTitle>{props.reportTitle}</StyleReportTitle>
        <StyleReportContent>{props.reportContent}</StyleReportContent>
      </div>
    </StyleReportCheckBox>
  );
}

export default ReportCheckBoxItem;
