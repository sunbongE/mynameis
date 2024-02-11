import React from 'react';
import styled from 'styled-components';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { acceptCouple } from '../../apis/services/matching/matching';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userState';
import { getUserInfo } from '../../apis/services/user/user';

interface SuccessModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  leaveSession: () => Promise<void>;
  coupleId: number;
}

interface BoxStyleProps {
  padding?: string;
  marginTop?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

const StyledBox = styled.div<BoxStyleProps>`
  row-gap: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.marginTop};
  padding: ${(props) => (props.padding ? props.padding : '10px')};
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : 'transparent')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '0px')};
`;

interface TextStyleProps {
  fontSize?: string;
  fontFamily?: string;
  underline?: boolean;
}

const StyledText = styled.p<TextStyleProps>`
  font-family: ${(props) => (props.fontFamily ? props.fontFamily : 'Pretendard SemiBold')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

const SuccessModal = (props: SuccessModalProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userInfoState);

  const handleApprove = async () => {
    // 커플 수락 요청 보내기
    const params = { coupleId: props.coupleId, answer: true };
    await acceptCouple(params);
    // 세션 떠나기
    props.leaveSession();

    // 유저 정보 다시 세팅
    const userInfo = await getUserInfo();
    if (userInfo) {
      setUser(userInfo);
      navigate('/'); // 일단 메인으로 이동
    }
  };

  const handlRefuse = async () => {
    // 커플 거절 요쳥 보내기
    const params = { coupleId: props.coupleId, answer: false };
    await acceptCouple(params);

    // 세션 떠나기
    props.leaveSession();

    // 메인으로 가
    navigate('/');
  };

  return (
    <StyledBox padding='20px'>
      <StyledText fontSize='28px'>매칭이 성사되었습니다</StyledText>
      <StyledBox marginTop='15px'>
        <StyledText>🎉 축하합니다!</StyledText>
        <StyledText>당신과 [영호]님 사이에 서로에게 호감이 느껴졌어요.</StyledText>
        <StyledText>커플이 되면 다음과 같은 기능을 사용할 수 있습니다.</StyledText>
      </StyledBox>
      <StyledBox marginTop='20px' padding='20px 30px' backgroundColor='#F4F4F4' borderRadius='10px'>
        <StyledText>1:1 채팅, 1:1 화상 채팅 이용 가능</StyledText>
        <StyledText>다대다 소개팅 서비스 이용 불가</StyledText>
      </StyledBox>
      <StyledBox marginTop='20px'>
        <StyledText underline={true}>커플을 맺으시겠습니까?</StyledText>
        <StyledText underline={true}>수락시 1:1 화상채팅으로 이동합니다.</StyledText>
      </StyledBox>
      <ButtonContainer>
        <Button onButtonClick={handlRefuse} backgroundColor={'white'} width={'160px'} height={'60px'} borderRadius={'8px'} borderColor='#e1a4b4'>
          거절하기
        </Button>
        <Button onButtonClick={handleApprove} backgroundColor={'#E1A4B4'} width={'160px'} height={'60px'} borderRadius={'8px'} fontColor='white'>
          수락하기
        </Button>
      </ButtonContainer>
    </StyledBox>
  );
};

export default SuccessModal;
