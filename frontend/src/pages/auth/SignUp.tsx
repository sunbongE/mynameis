import { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { SimpleInput, ConfirmationCodeInput, PasswordInput } from '../../components/input/Input';
import Button from '../../components/button/Button';
import CustomDropdown from '../../components/dropdown/Dropdown';
import { CustomRadioButton } from '../../components/button/RadioButton';
import Chip from '../../components/chip/Chip';
import { userSignUp } from '../../apis/services/user/user';
import { useNavigate } from 'react-router-dom';

const StyledSignUpContainer = styled.div`
  width: 537px;
  height: 1300px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const StyledSignUpInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;

  color: #b0a9a9;
  font-family: 'Plus Jakarta Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyleLabel = styled.label`
  color: #b0a9a9;
  font-family: 'Plus Jakarta Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function SignUp() {
  const navigate = useNavigate();
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailDropdown, setEmailDropdown] = useState('')
  const [areaDropdown, setAreaDropdown] = useState('')
  const [birthDropdown, setBirthDropdown] = useState('')
  const [yearDropdown, setYearDropdown] = useState('')
  const [monthDropdown, setMonthDropdown] = useState('')
  const [dayDropdown, setDayDropdown] = useState('')
  const [religionDropdown, setReligionDropdown] = useState('')
  const [registrationData, setRegistrationData] = useState({
    userId: '',
    password: '',
    email: '',
    name: '',
    gender: '',
    birth: '',
    phone: '',
    area: '',
    job: '',
    tag: [],
    religion: '',
  });
  
  const [selectedGender, setSelectedGender] = useState('');
  const genderValues = [
    { id: 0, name: 'gender', value: '남성' },
    { id: 1, name: 'gender', value: '여성' },
  ];

  const administrativeDistrict = ['서울특별시', '인천광역시', '대전광역시', '대구광역시', '울산광역시', '부산광역시', '광주광역시', '세종특별자치시', '경기도', '강원도', '충청남도', '충청북도', '전라북도', '전라남도', '경상북도', '경상남도']

  const BirthData = (start: number, end: number): Array<string> => {
    const result: Array<string> = [];
    for (let i = start; i <= end; i++) {
      result.push(`${i}`);
    }
    return result;
  };
  const birthYearOptions = BirthData(1950, 2005);
  const birthMonthOptions = BirthData(1, 12);
  const birthDayOptions = BirthData(1, 31);



  const handleDropdownChange = (selectedOption:string) => {
    setEmailDropdown(selectedOption)
    setYearDropdown(selectedOption)
    setMonthDropdown(selectedOption)
    setDayDropdown(selectedOption)
    setAreaDropdown(selectedOption)
    setReligionDropdown(selectedOption)
  }

  const handleUserIdChange = (value: string) => {
    setRegistrationData((prevData) => ({ ...prevData, userId: value }));
  };

  const handlePasswordChange = (value: string) => {
    setRegistrationData((prevData) => ({ ...prevData, password: value }));
    console.log('비밀번호 입력 : ', registrationData.password )
  };

  const handlePasswordConfirmChange = (value: string) => {
    setPasswordConfirm(value)
    console.log('비밀번호 확인 : ', passwordConfirm)
  };

  const handleEmailChange = (value: string) => {
    const emailName = value
    console.log(`${emailName}@${emailDropdown}`)
    setRegistrationData((prevData) => ({ ...prevData, email: `${emailName}@${emailDropdown}` }));
  };

  const handleNameChange = (value: string) => {
    setRegistrationData((prevData) => ({ ...prevData, name: value }));
    console.log(registrationData.phone)
  };
  

  const handleBirthChange = (value: string) => {
    console.log(`${yearDropdown}${monthDropdown}${dayDropdown}`)
    setRegistrationData((prevData) => ({ ...prevData, birth: `${yearDropdown}${monthDropdown}${dayDropdown}` }));
  };

  const handlePhoneChange = (value: string) => {
    setRegistrationData((prevData) => ({ ...prevData, phone: value }));
  }

  const handleAreaChange = (value: string) => {
    setRegistrationData((prevData) => ({ ...prevData, area: value }));
  }

  const handleJobChange = (value: string) => {
    setRegistrationData((prevData) => ({ ...prevData, job: value }));
  }

  const handleReligionChange = (value: string) => {
    setRegistrationData((prevData) => ({ ...prevData, religion: value }));
  }




  const handleSignUp = async () => {
    try {
      const booleanGender = registrationData.gender === '남성' ? true : false;
      const { gender, tag, ...restData } = registrationData;
      const response = await userSignUp({ gender: booleanGender, tag: [], ...restData });
      console.log('회원가입 성공:', response);
      navigate('/'); // 메인 페이지 이동
    } catch (error) {
      console.log('회원가입 실패:', error);
      // 회원가입 실패 후 처리 : 에러 메시지 표시, 로그인 페이지 이동 등
    }
  };

  return (
    <StyledSignUpContainer>
      <h2>회원가입</h2>
      <StyledSignUpInputContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyleLabel htmlFor='Id'>아이디</StyleLabel>
          <SimpleInput placeholder='아이디 입력' id='Id' value={registrationData.userId} onInputChange={handleUserIdChange} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <StyleLabel htmlFor='password'>비밀번호</StyleLabel>
          <SimpleInput placeholder='비밀번호 입력' id='password' value={registrationData.password} onInputChange={handlePasswordChange} />
          <PasswordInput placeholder='비밀번호 확인' value={passwordConfirm} onInputChange={handlePasswordConfirmChange} isReturn={true} originValue={registrationData.password} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyleLabel htmlFor='email'>이메일</StyleLabel>
          <div style={{ display: 'flex' }}>
            <SimpleInput placeholder='이메일 계정' id='email' value={registrationData.email} onInputChange={handleEmailChange} width='165px' />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>@</div>
            <CustomDropdown options={['gmail.com', 'naver.com', 'hanmail.net','kakao.com']} width='103px' onSelected={handleDropdownChange} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <StyleLabel htmlFor='username'>이름</StyleLabel>
          <SimpleInput placeholder='이름 입력' id='username' value={registrationData.name} onInputChange={handleNameChange} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <StyleLabel htmlFor='gender'>성별</StyleLabel>
          <div style={{ display: 'flex' }}>
            <CustomRadioButton values={genderValues} version='gender' selected={selectedGender} setSelected={setSelectedGender} id='gender' />
          </div>
        </div>
        <div>
          <StyleLabel htmlFor='birth'>생년월일</StyleLabel>
          <div style={{ display: 'flex', gap: '8px' }}>
            <CustomDropdown options={birthYearOptions} width='94px' onSelected={handleDropdownChange} />
            <CustomDropdown options={birthMonthOptions} width='94px' onSelected={handleDropdownChange} />
            <CustomDropdown options={birthDayOptions} width='94px' onSelected={handleDropdownChange} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <StyleLabel htmlFor='phoneAuth'>휴대폰 인증</StyleLabel>
          <div style={{ display: 'flex', gap: '10px' }}>
            <SimpleInput placeholder='전화번호를 입력하세요' id='phoneAuth' value={registrationData.phone} onInputChange={handlePhoneChange} width='220px' />
            <Button width='70px' height='50px' borderRadius='10px' backgroundColor='#E1A4B4' fontColor='#FFF' fontSize='12px'>
              다시 요청
            </Button>
          </div>
          <ConfirmationCodeInput placeholder='인증번호' value={''} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyleLabel htmlFor='area'>지역</StyleLabel>
          <CustomDropdown options={administrativeDistrict} width='300px' onSelected={handleDropdownChange} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyleLabel htmlFor='job'>직업</StyleLabel>
          <SimpleInput placeholder='직업을 입력하세요' id='job' value={registrationData.job} onInputChange={handleJobChange}/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyleLabel htmlFor='hashtag'>MBTI/흥미/특기</StyleLabel>
          <SimpleInput placeholder='나를 표현하는 단어를 입력하세요' id='hashtag' value='' />
          <Chip keyword={'INFP'} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyleLabel htmlFor='religion'>종교</StyleLabel>
          <CustomDropdown options={['무교', '기독교', '천주교', '불교']} width='300px' onSelected={handleDropdownChange} />
        </div>
        <Button width='300px' height='50px' borderRadius='10px' backgroundColor='#E1A4B4' fontColor='#FFF' onButtonClick={handleSignUp}>
          입력 완료
        </Button>
      </StyledSignUpInputContainer>
    </StyledSignUpContainer>
  );
}

export default SignUp;
