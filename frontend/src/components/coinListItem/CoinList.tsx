import React, { useEffect, useState } from 'react';
import { Close, Coin } from '../../config/IconName';
import CoinListItem from './CoinListItem';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userState';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import { userCoinPaymentRequest, userCoinPaymentConfirm } from '../../apis/services/user/user';
import { useNavigate } from 'react-router-dom';
import { paymentState } from '../../recoil/atoms/paymentState';


interface CoinProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CustomWindow extends Window {
  returnValue: string; // or the type you expect
}


const CoinListContainer = styled.div`
  width: 404px;
  height: 514.4px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const StyledCoinList = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CoinHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

function CoinList(props: CoinProps) {
  const navigate = useNavigate()
  const [selectedCoinId, setSelectedCoinId] = useState<number | null>(null);
  const coinItems = [
    {
      orderId: 10,
      coinText: `코인 10개`,
      coinPrice: `\\ 1,000`,
    },
    {
      orderId: 30,
      coinText: '코인 30개',
      coinPrice: `\\ 3,000`,
    },
    {
      orderId: 50,
      coinText: '코인 50개',
      coinPrice: `\\ 5,000`,
    },
    {
      orderId: 110,
      coinText: '코인 110개',
      coinPrice: `\\ 10,000`,
    },
    {
      orderId: 220,
      coinText: '코인 220개',
      coinPrice: `\\ 20,000`,
    },
    {
      orderId: 345,
      coinText: '코인 345개',
      coinPrice: `\\ 30,000`,
    },
    {
      orderId: 600,
      coinText: '코인 600개',
      coinPrice: `\\ 50,000`,
    },
  ];

  const handleItemClick = (item: { orderId: number; coinText: string; coinPrice: string }) => {
    setSelectedCoinId((prevId) => (prevId === item.orderId ? null : item.orderId));
    setCoinInfoData((prevData) => ({
      ...prevData,
      partner_user_id: userInfo ? userInfo.userId : '',
      partner_order_id: item.orderId,
      item_name: item.coinText,
      total_amount: parseInt(item.coinPrice.replace(/\D/g, ''), 10), // 숫자만 추출하여 정수로 변환
    }));
  };

  const userInfo = useRecoilValue(userInfoState);
  const setPayState = useSetRecoilState(paymentState)
  const payState = useRecoilValue(paymentState)

  const [coinInfoData, setCoinInfoData] = useState({
    partner_user_id: userInfo ? userInfo.userId : '',
    partner_order_id: 0,
    item_name: '',
    total_amount: 0,
    approval_url:'http://localhost:3000/payresult',
    cancel_url:'http://localhost:3000',
    fail_url:'http://localhost:3000',
  });

  const [payApproveData, setPayApproveData ] = useState({
    tid: window.localStorage.getItem("tid"),
    partner_user_id: userInfo?.userId,
    partner_order_id: payState.partner_order_id,
    pg_token:'',
  })

  const [coinPaymentData, setCoinPaymentData] = useState({
    tid:'',
    partner_user_id: userInfo ? userInfo.userId : '',
    partner_order_id: coinInfoData.partner_order_id,
    pg_token:''
  })

  // useEffect(() => {
  //   console.log('Recoil 페이 정보가 업데이트됨:', payState);
  // }, [payState]);


  const kakaoPayment = async () => {
    try {
      if (userInfo) {
        const response = await userCoinPaymentRequest(coinInfoData);
        console.log(response);

        alert('결제를 위해 새 창이 열립니다. 팝업 차단 기능을 확인해주세요.');
        // const tid = response.tid;
        window.localStorage.setItem("tid", response.tid);
        // const pcUrl = response.next_redirect_pc_url;
        
        setPayState((prevPayState) => ({
          ...prevPayState,
          tid: response.tid,
          payUrl: response.next_redirect_pc_url,
          partner_order_id: coinPaymentData.partner_order_id
        }));
        



        const popup = window.open(response.next_redirect_pc_url, '_blank', 'width=600,height=800');
        navigate('/payresult')

        const searchParams = new URLSearchParams(popup?.location.search);
        const pgToken = searchParams.get('pg_token');
        console.log(popup?.location.href)
        console.log('팝업창에서 가져온 pg_token:', pgToken);

        window.close

        const handleApprove = async () => {
          try {
            // ... (이전 코드 생략)
            
            const response = await userCoinPaymentConfirm(payApproveData);
            console.log(response);
      
            // 팝업창의 URL에서 pg_token 값을 가져오기
            const searchParams = new URLSearchParams(popup?.location.search);
            const pgToken = searchParams.get('pg_token');
            console.log('팝업창에서 가져온 pg_token:', pgToken);
      
            window.close(); // 결제 완료 후 창이 닫힘
      
          } catch (error) {
            console.error('에러입니다.');
            console.error(error);
          }
        };

        
        
        // const popup = window.open(response.next_redirect_pc_url, '_blank', 'width=600,height=800') as CustomWindow;
        // if (popup) {
        //   popup.postMessage({ tid: response.tid, payUrl: response.next_redirect_pc_url }, window.origin);
        // }
        
        // console.log('리코일 페이정보 : ',payState)
        
        
        
        
        
        // navigate('/success'); // 성공 페이지로 이동
        // // if (popup) {
        //   // 팝업 창이 닫힐 때 수행할 작업
        //   popup.onbeforeunload = () => {
        //     console.log('팝업 창이 닫힘');
        //     // 팝업에서 반환된 값을 부모 창에서 사용
        //     const queryParams = new URLSearchParams(popup.location.search);
        //     const returnedValue = queryParams.get('returnValue');
        //     console.log('URL에서 반환된 값:', returnedValue);

        //     // 부모 창에서 반환된 값에 따라 필요한 작업 수행
        //     if (returnedValue === 'success') {
        //       navigate('pay/success'); // 성공 페이지로 이동
        //     } else {
        //       navigate('/failure'); // 실패 페이지로 이동
        //     }
        //   // };
        // }
        

        // const newWindow = window.open(pcUrl, '_blank', 'width=600,height=800');
        // window.location.href = pcUrl;

        // console.log(window.location.search, '==================')
        
        // if (newWindow) {
        //   newWindow.onload = () => {
        //     console.log('새 창의 위치 : ', newWindow.location.search);
        //   };
        // }

        // console.log(window.location.search, '==================')
        // setCoinPaymentData({
        //   tid:tid,
        //   pg_token: '',
        // })



        console.log('결제 요청 성공');
      }
      // const response = await
    } catch (error) {
      console.error('결제요청 실패');
      // console.log(pcUrl.window.location)
    }
  };

  return (
    <>
      {userInfo && (
        <>
          <CoinHeader>
            <div></div>
            <div onClick={() => props.setIsOpen(false)}>
              <Icon src={Close} />
            </div>
          </CoinHeader>
          <CoinListContainer>
            <h2 style={{ marginBottom: '30px' }}>내 코인 {userInfo.coin}개</h2>
            <StyledCoinList>
              {coinItems.map((item) => (
                <CoinListItem key={item.orderId} id={item.orderId} coinText={item.coinText} coinPrice={item.coinPrice} isSelected={selectedCoinId === item.orderId} onClick={() => handleItemClick(item)} />
              ))}
              <Button onButtonClick={kakaoPayment} backgroundColor={'#E1A3B3'} width={'339.2px'} height={'38.4px'} borderRadius={'16px'} children={<p>결제하기</p>} fontColor='#fff' fontSize='18px'></Button>
            </StyledCoinList>
          </CoinListContainer>
        </>
      )}
    </>
  );
}

export default CoinList;
