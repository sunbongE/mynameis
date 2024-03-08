import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '../icon/Icon';
import { Star, Triangle } from '../../config/IconName';
import Button from '../button/Button';
import { Person, Cake, Bag, Location, Coin, Crown } from '../../config/IconName';
import { addCommaInNumber, formatDate } from '../../utils/numberUtil';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userState';
import { column } from 'stylis';

interface MyPageCardProps {
  isCoinOpenPage: boolean;
  onCoinClick: () => void;
}

interface TextStyleProps {
  fontSize: string;
  fontColor?: string;
}

interface BoxStyleProps {
  width?: string;
  backgroundColor?: string;
  padding?: string;
}

const MyPageContainer = styled.div`
  background-color: white;
  position: absolute;
  top: 90px;
  right: 40px;
  width: 420px;
  padding: 35px;
  border-radius: 10px;
  z-index: 10;
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledText = styled.p<TextStyleProps>`
  font-family: 'Pretendard SemiBold';
  margin: 0px 10px;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => (props.fontColor ? props.fontColor : 'black')};
`;

const UserDetailContainer = styled.div<BoxStyleProps>`
  font-family: 'Pretendard SemiBold';
  margin-top: 20px;
  padding: 15px ${(props) => (props.padding ? props.padding : '20px')};
  box-shadow: 0px 0px 16px 1.6px rgba(0, 0, 0, 0.1);
  width: ${(props) => (props.width ? props.width : '100%')};
  border-radius: 16px;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : 'white')};
`;

const UserDetailHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 5px;
`;

const UserDetailTitle = styled.div`
  padding: 5px 0px;
  border-bottom: 1px solid #9a9a9a;
  font-family: 'Pretendard Bold';
  font-size: 12px;
`;

const UserDetailBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const UserDetailBodyItem = styled.div<BoxStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${(props) => (props.width ? props.width : '100%')};
  margin-bottom: 14px;
`;

const UserDetailBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TextContainer = styled.div<BoxStyleProps>`
  text-align: center;
  width: ${(props) => (props.width ? props.width : '100%')};
  padding: ${(props) => (props.padding ? props.padding : '0')};

  :hover {
    cursor: pointer;
  }
`;

const CoinButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const TriangleContainer = styled.div`
  position: absolute;
  top: 70px;
  right: 160px;
  z-index: 5;
`;

const MyPageCard = (props: MyPageCardProps) => {
  // recoil에서 회원 정보 가져오기?
  // const user = { name: '한소희', coin: 1000, gender: false, birth: '20000814', area: '광주광역시', job: '개발자', tag: ['여행가기', '노래'], religion: '기독교', coupleId: null, isValid: 'true' };

  const [userInfo, setuser] = useRecoilState(userInfoState);

  console.log(userInfo);

  return (
    <>
      {userInfo && userInfo.tag && (
        <>
          <TriangleContainer>
            <Icon src={Triangle} width='28px' />
          </TriangleContainer>
          <MyPageContainer>
            <UserInfo>
              <Icon src={Star} width='20px' />
              <StyledText fontSize='20px'>{userInfo.name}님</StyledText>
              <Button backgroundColor='white' width='38px' height='18px' borderRadius='8px' borderColor='#e1a4b4' fontColor='#e1a4b4' fontSize='9px'>
                {userInfo.coupleId ? '커플' : '솔로'}
              </Button>
            </UserInfo>
            <UserDetailContainer width='100%'>
              <UserDetailHeader>
                <UserDetailTitle>회원정보</UserDetailTitle>
                <Button backgroundColor='white' width='38px' height='18px' borderRadius='8px' borderColor='#e1a4b4' fontColor='#e1a4b4' fontSize='9px'>
                  수정
                </Button>
              </UserDetailHeader>
              <UserDetailBody>
                <UserDetailBodyItem width='50%'>
                  <Icon src={Person} width='12px' />
                  <StyledText fontSize='12px'>{userInfo.gender ? '남성' : '여성'}</StyledText>
                </UserDetailBodyItem>
                <UserDetailBodyItem width='50%'>
                  <Icon src={Bag} width='14px' />
                  <StyledText fontSize='12px'>{userInfo.job}</StyledText>
                </UserDetailBodyItem>
                <UserDetailBodyItem width='50%'>
                  <Icon src={Cake} width='12px' />
                  <StyledText fontSize='12px'>{formatDate(userInfo.birth)}</StyledText>
                </UserDetailBodyItem>
                <UserDetailBodyItem width='50%'>
                  <Icon src={Location} width='10px' />
                  <StyledText fontSize='12px'>{userInfo.area}</StyledText>
                </UserDetailBodyItem>
                <UserDetailBodyItem width='50%'>
                  <Icon src={Crown} width='12px' />
                  <StyledText fontSize='12px'>{userInfo.religion}</StyledText>
                </UserDetailBodyItem>
              </UserDetailBody>
            </UserDetailContainer>
            <UserDetailBox>
              <UserDetailContainer width='55%'>
                <UserDetailHeader>
                  <UserDetailTitle>나를 표현하는 단어</UserDetailTitle>
                  <Button backgroundColor='white' width='38px' height='18px' borderRadius='8px' borderColor='#e1a4b4' fontColor='#e1a4b4' fontSize='9px'>
                    수정
                  </Button>
                </UserDetailHeader>
                <UserDetailBody>
                  <UserDetailBodyItem width='100%'>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {userInfo.tag.map((tag, index) => (
                        <StyledText key={index} fontSize='12px'>
                          # {tag}
                        </StyledText>
                      ))}
                    </div>
                  </UserDetailBodyItem>
                  {/* <StyledText fontSize='12px'># {userInfo.tag[0]}</StyledText>
                  <UserDetailBodyItem width='100%'>
                    <StyledText fontSize='12px'># {userInfo.tag[1]}</StyledText>
                  </UserDetailBodyItem>
                  <UserDetailBodyItem width='100%'>
                    <StyledText fontSize='12px'># {userInfo.tag[2]}</StyledText>
                  </UserDetailBodyItem> */}
                </UserDetailBody>
              </UserDetailContainer>
              <UserDetailContainer width='42%' backgroundColor='#FF9393' padding='10px'>
                <UserDetailHeader>
                  <UserDetailBodyItem width='100%'>
                    <Icon src={Coin} width='20px' height='20px' />
                    <StyledText fontSize='12px' fontColor='white'>
                      보유 코인
                    </StyledText>
                  </UserDetailBodyItem>
                </UserDetailHeader>
                <TextContainer>
                  <StyledText fontSize='22px' fontColor='white'>
                    {addCommaInNumber(userInfo.coin)} 코인
                  </StyledText>
                </TextContainer>
                <CoinButtonContainer>
                  <Button backgroundColor={'white'} width={'64px'} height={'30px'} borderRadius={'12px'} fontColor='#FF9393' fontSize='12px' onButtonClick={props.onCoinClick}>
                    충전
                  </Button>
                </CoinButtonContainer>
              </UserDetailContainer>
            </UserDetailBox>
            {userInfo.coupleId && (
              <UserDetailBox>
                <UserDetailContainer
                  width='48%'
                  onClick={() => {
                    console.log('채팅방이동');
                  }}
                >
                  <TextContainer>커플 채팅방</TextContainer>
                </UserDetailContainer>
                <UserDetailContainer
                  width='48%'
                  onClick={() => {
                    console.log('헤어져');
                  }}
                >
                  <TextContainer>헤어지기</TextContainer>
                </UserDetailContainer>
              </UserDetailBox>
            )}
            <TextContainer padding='20px 0 0 0'>
              <StyledText
                fontSize='10px'
                fontColor='#dddddd'
                onClick={() => {
                  console.log('탈퇴');
                }}
              >
                회원탈퇴
              </StyledText>
            </TextContainer>
          </MyPageContainer>
        </>
      )}
    </>
  );
};

export default MyPageCard;
