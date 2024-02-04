import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../components/icon/Icon';
import { Close } from '../../config/IconName';
import { SimpleRadioButton } from '../../components/button/RadioButton';
import Button from '../../components/button/Button';
import CustomDropdown from '../../components/dropdown/Dropdown';
import { matchingCancel, matchingCheck, matchingStart } from '../../apis/services/matching/matching';
import Toast from '../../components/toast/Toast';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import Cookies from 'js-cookie';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { MatchingInfo, matchingInfoState } from '../../recoil/atoms/matchingState';
import { useNavigate } from 'react-router-dom';

interface StartModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 25vw;
`;

interface BoxStyleProps {
  marginTop?: string;
  flexDirection?: string;
}

const ModalBox = styled.div<BoxStyleProps>`
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '20px')};
  display: flex;
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'column')};
  justify-content: center;
  align-items: center;
`;

interface TextStyleProps {
  fontSize: string;
  fontFamily?: string;
  fontColor?: string;
}

const StyledText = styled.p<TextStyleProps>`
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => (props.fontFamily ? props.fontFamily : 'Pretendard SemiBold')};
  color: ${(props) => (props.fontColor ? props.fontColor : 'black')};
`;

const StartModal = (props: StartModalProps) => {
  const navigate = useNavigate();

  const values: Array<Object> = [
    { id: 'two', name: 'number', value: '2:2' },
    { id: 'three', name: 'number', value: '3:3' },
    { id: 'four', name: 'number', value: '4:4' },
  ];

  const [selectedNumber, setSelectedNumber] = useState<string>('');
  const [isStart, setIsStart] = useState(false);

  const handleClose = () => {
    const data = matchingCancel();
    toast('매칭이 취소되었습니다.', { theme: 'dark', duration: 1000 });
    props.setIsOpen(false);
    setIsStart(false);
  };

  const handelStart = async () => {
    setIsStart(true);
    const params = { type: selectedNumber };
    const data = await matchingStart(params);
    if (data.body.code === '202') {
      toast('매칭 대기열에 등록되었습니다', { theme: 'dark', duration: 1000 });
      setTimeout(() => {
        setLoadingModalOpen(true);
      }, 300);

      // 여기서 매칭 체크
    } else {
      toast('이미 대기열에 등록되어 있습니다', { theme: 'dark', duration: 1000 });
      props.setIsOpen(false);
    }
  };

  const [loadingModalOpen, setLoadingModalOpen] = useState<boolean>(false);
  const [isMatchingPossible, setIsMatchingPossible] = useState(false);

  const setMatchingInfo = useSetRecoilState(matchingInfoState);

  const handleCheck = async () => {
    if (isStart) {
      return await matchingCheck();
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkStatus = async () => {
      const data = await handleCheck();
      console.log('결과', data);

      if (data && data.status === 200) {
        toast('매칭이 생성되었습니다. 5초 후에 이동합니다', { theme: 'dark' });
        setIsMatchingPossible(true);
        const userInfo = JSON.parse(data.data.userInfo);
        setMatchingInfo({ ...userInfo, userInfo: userInfo, userId: data.data.userId, randomName: data.data.randomName, token: data.data.token });
        setTimeout(() => {
          navigate(`/room/${data.data.roomId}`);
        }, 3000);
        clearInterval(intervalId);
      }
    };

    if (isStart === true) {
      // 처음에 handleCheck을 실행합니다.
      checkStatus();

      // 10초마다 handleCheck을 실행하는 간격을 설정합니다.
      intervalId = setInterval(checkStatus, 10000);
    }

    // 컴포넌트가 언마운트되거나 isStart가 false가 되면 interval을 정리합니다.
    return () => {
      clearInterval(intervalId);
    };
  }, [isStart]);

  return (
    <ModalContainer>
      {loadingModalOpen ? (
        <>
          <div onClick={handleClose}>
            <Icon src={Close} width='8px' height='8px' />
          </div>
          <ModalBox marginTop='50px'>
            <LoadingSpinner />
          </ModalBox>
          <ModalBox>
            <StyledText fontSize='14px' fontFamily='Pretendard Regular'>
              당신을 위한 특별한 만남을 찾는 중입니다..
            </StyledText>
            <StyledText fontSize='14px' fontFamily='Pretendard Regular'>
              잠시만 기다려주세요!
            </StyledText>
          </ModalBox>
        </>
      ) : (
        <>
          <div onClick={handleClose}>
            <Icon src={Close} width='8px' height='8px' />
          </div>

          <ModalBox>
            <StyledText fontSize='24px'>원하는 상대의 조건을 선택해 보세요</StyledText>
            <StyledText fontSize='14px' fontColor='#999999' fontFamily='Pretendard Regular'>
              선택이 어려우시다면 다양한 옵션을 시도해보세요
            </StyledText>
          </ModalBox>
          <ModalBox marginTop='30px'>
            <StyledText fontSize='18px' fontFamily='Pretendard Regular'>
              인원을 선택하세요
            </StyledText>
            <ModalBox flexDirection='row' marginTop='14px'>
              <SimpleRadioButton values={values} selected={selectedNumber} setSelected={setSelectedNumber} />
            </ModalBox>
          </ModalBox>
          <ModalBox marginTop='30px'>
            <Button
              onButtonClick={
                selectedNumber !== ''
                  ? handelStart
                  : () => {
                      toast('인원을 선택해주세요', { theme: 'dark', duration: 1000 });
                    }
              }
              backgroundColor={'#e1a4b4'}
              width={'400px'}
              height={'60px'}
              borderRadius={'10px'}
              fontColor='white'
            >
              매칭 시작하기
            </Button>
          </ModalBox>
        </>
      )}
    </ModalContainer>
  );
};

export default StartModal;
