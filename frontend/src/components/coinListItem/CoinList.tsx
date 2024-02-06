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
      id: 10,
      coinText: '코인 10개',
      coinPrice: `\\ 1,000`,
    },
    {
      id: 30,
      coinText: '코인 30개',
      coinPrice: `\\ 3,000`,
    },
    {
      id: 50,
      coinText: '코인 50개',
      coinPrice: `\\ 5,000`,
    },
    {
      id: 110,
      coinText: '코인 110개',
      coinPrice: `\\ 10,000`,
    },
    {
      id: 220,
      coinText: '코인 220개',
      coinPrice: `\\ 20,000`,
    },
    {
      id: 345,
      coinText: '코인 345개',
      coinPrice: `\\ 30,000`,
    },
    {
      id: 600,
      coinText: '코인 600개',
      coinPrice: `\\ 50,000`,
    },
  ];

  const handleItemClick = (id: number) => {
    setSelectedCoinId((prevId) => (prevId === id ? null : id));
  };

  const userInfo = useRecoilValue(userInfoState);

  const [coinInfoData, setCoinInfoData] = useState({
    partner_user_id:'',
    partner_order_id:0,
    item_name:'',
    total_amount:0,
  })

//   useEffect

  const kakaoPayment = async () => {
    try {
        console.log('결제 성공')
        // const response = await 
    } catch (error) {
        console.error('결제요청 실패')
    }
  }

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
                <CoinListItem key={item.id} id={item.id} coinText={item.coinText} coinPrice={item.coinPrice} isSelected={selectedCoinId === item.id} onClick={() => handleItemClick(item.id)} />
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
