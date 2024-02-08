<div></div>

// import React, { useState, useEffect } from 'react';
// import { userPayReady } from '../../apis/services/user/user';

// interface PayReadyProps {
//   coinInfoData: {
//     partner_user_id: string;
//     partner_order_id: number;
//     item_name: string;
//     total_amount: number;
//   };
//   onClose: () => void;
// }

// const PayReady: React.FC<PayReadyProps> = ({ coinInfoData, onClose }) => {
//   const [pcUrl, setPcUrl] = useState<string>('');


//     // 부모 창에서 호출되는 함수
// const receiveDataFromPopup = (data) => {
//     console.log('Received data from popup:', data);
    
//   const sendDataToParent = () => {
//     const data = {
//       param1: 'value1',
//       param2: 'value2',
//     };
  
//     // 부모 창으로 데이터 전달
//     if (window.opener) {
//       window.opener.receiveDataFromPopup(data);
//     }
  
//     // 팝업 창 닫기 (선택적)
//     window.close();
//   };
  



//   useEffect(() => {
//     const fetchPaymentInfo = async () => {
//       try {
//         const response = await userPayReady(coinInfoData);
//         console.log(response)

//         const tid = response.tid;
//         localStorage.setItem('tid', tid);

//         const nextPcUrl = response.next_redirect_pc_url;
//         setPcUrl(nextPcUrl);

//         // 팝업 열기
//         openPopup();
//       } catch (error) {
//         console.error('결제 준비 실패', error);
//         // 실패 처리 로직 추가
//       }
//     };

//     fetchPaymentInfo();
//   }, [coinInfoData]);

//   const openPopup = () => {
//     if (pcUrl) {
//       // 부모 창의 URL에 쿼리 매개변수를 추가
//       const queryParams = new URLSearchParams();
//       const query = new URLSearchParams(location.search);
//       const pgToken = query.get('pg_token');
//       console.log('피지토큰 : ',pgToken)
//       queryParams.append('param1', 'value1');
//       queryParams.append('param2', 'value2');
//       const popupUrl = `${pcUrl}?${queryParams.toString()}`;
  
//       // 팝업 열기
//       const options = 'width=600,height=800,scrollbars=yes';
//       window.open(popupUrl, '_blank', options);
//     } else {
//       console.error('pcUrl이 유효하지 않습니다.');
//     }
//   };

//   const fetchQueryParams = () => {
//     // 현재 창의 URL에서 쿼리 매개변수 가져오기
//     const currentUrlSearchParams = new URLSearchParams(window.location.search);
//     const param1Value = currentUrlSearchParams.get('param1');
//     const param2Value = currentUrlSearchParams.get('param2');
//     console.log('param1 value:', param1Value);
//     console.log('param2 value:', param2Value);
//   };
  
//   // 컴포넌트가 마운트되었을 때 실행
//   useEffect(() => {
//     fetchQueryParams();
//   }, []);



//   const handlePopupClose = () => {
//     // 팝업이 닫힐 때 실행되는 로직 추가
//     onClose();
//   };

//   return <div></div>;
// };

// export default PayReady;
