import React, { useEffect, useState } from 'react';
import { Close, Coin } from '../../config/IconName';
import CoinListItem from './CoinListItem';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userState';
import Icon from '../icon/Icon';
import Button from '../button/Button';

interface CoinProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
    setCoinInfoData({
      partner_user_id: userInfo?.userId,
      partner_order_id: item.orderId,
      item_name: item.coinText,
      total_amount: parseInt(item.coinPrice.replace(/\D/g, ''), 10), // 숫자만 추출하여 정수로 변환
    });
  };

  const userInfo = useRecoilValue(userInfoState);

  const [coinInfoData, setCoinInfoData] = useState({
    partner_user_id: userInfo?.userId,
    partner_order_id: 0,
    item_name: '',
    total_amount: 0,
  });

  useEffect(() => {
    console.log('coinInfoData!!!', coinInfoData);
  }, [coinInfoData]);

  const kakaoPayment = async () => {
    try {
      console.log('결제 성공');
      console.log('!!!', coinInfoData);
      // const response = await
    } catch (error) {
      console.error('결제요청 실패');
      console.log(coinInfoData);
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
