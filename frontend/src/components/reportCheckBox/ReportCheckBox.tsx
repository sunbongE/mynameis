import styled from 'styled-components';
import { useState } from 'react';

interface ReportCheckBoxItemProps {
  reportTitle: string;
  reportContent: string;
}

const StyleReportCheckBox = styled.div`
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
  font-family: 'Pretendard SemiBold';
  font-size: 18px;
`;

const StyleReportContent = styled.div`
  width: 430px;
  font-family: 'Pretendard Regular';
  font-size: 14px;
`;

function ReportCheckBoxItem(props: ReportCheckBoxItemProps) {
  const [isChecked, setIsChecked] = useState(false);

  function changeHandler() {
    setIsChecked((prev) => !prev);
  }

  return (
    <StyleReportCheckBox>
      <StyleChecked type='checkbox' checked={isChecked} onChange={changeHandler} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <StyleReportTitle>{props.reportTitle}</StyleReportTitle>
        <StyleReportContent>{props.reportContent}</StyleReportContent>
      </div>
    </StyleReportCheckBox>
  );
}

export default ReportCheckBoxItem;
