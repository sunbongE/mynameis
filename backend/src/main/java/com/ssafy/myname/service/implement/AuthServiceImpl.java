package com.ssafy.myname.service.implement;

import com.ssafy.myname.commons.CertificationNumber;
import com.ssafy.myname.db.entity.Certification;
import com.ssafy.myname.db.entity.PhoneCertification;
import com.ssafy.myname.db.entity.Tags;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.*;
import com.ssafy.myname.dto.request.auth.*;
import com.ssafy.myname.dto.response.ResponseDto;
import com.ssafy.myname.dto.response.auth.*;
import com.ssafy.myname.dto.response.email.EmailResponseDto;
//import com.ssafy.myname.provider.EmailProvider;
import com.ssafy.myname.provider.JwtProvider;
//import com.ssafy.myname.provider.PhoneProvider;
import com.ssafy.myname.service.AuthService;
//import com.ssafy.myname.service.RedisService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PhoneCertificationRepository phoneCertificationRepository;
//    private final EmailProvider emailProvider;
//    private final PhoneProvider phoneProvider;
    private final JwtProvider jwtProvider;
//    private final RedisService redisService;
    private final TagRepository tagRepository;


    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    private final Logger logger =  LoggerFactory.getLogger(this.getClass());

    @Override
    public ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto) {

        try{
            String userId = dto.getUserId();
            boolean isExistId = userRepository.existsByUserId(userId);

            if(isExistId) return IdCheckResponseDto.duplicateId();

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }


        return IdCheckResponseDto.success();
    }




    @Override // 회원가입
    public ResponseEntity<? super SignUpResDto> signUp(SignUpReqDto dto) {
        logger.info("signUp, dto:{}",dto.toString());
        try {
            // 아이디 중복확인
            String userId = dto.getUserId();
            if(isExistUserId(userId)) return SignUpResDto.duplicateId();//이미 있는 아이디인경우.
            // 이메일 중복확인
            String email = dto.getEmail();
            if(isExistUserEmail(email)) return SignUpResDto.duplicateEmail();//이미 있는 email인경우.
            // 전화번호 중복확인
            String phone = dto.getPhone();
            if(isExistUserPhone(phone)) return SignUpResDto.duplicatePhone();//이미 있는 phone인경우.
            // 비밀번호 암호화.
            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            User user = new User(dto);
            userRepository.save(user);

            List<String> tagNames = dto.getTags();
            for (String tagName : tagNames) {
                Tags tags = new Tags(user, tagName);
                tagRepository.save(tags);
            }

            // 회원 저장.
            // 리프레시토큰 저장.
            String token = jwtProvider.create(userId, "RT");
//            redisService.setDataExpire(userId,token,60*60*24*15); // 15일


        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResDto.success();
    }



    @Override // 로그인.
    public ResponseEntity<? super SignInResDto> signIn(SignInReqDto dto) {
        String token = null;
        String refreshToken=null;

        try {
            // 회원아이디로 회원엔터티 조회
            String userId = dto.getUserId();
            User user = userRepository.findByUserId(userId);
            if (user == null) return SignInResDto.fail(); // 회원이 없으면 로그인 실패안내

            // 입력받은 비밀번호 암호화 후 db의 비밀번호와 비교
            String password = dto.getPassword();
            String encodedPassword = user.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if (!isMatched) return SignInResDto.fail(); // 비번이 다르면 실패안내.

            //=========================================================================
            // 엑세스 토큰 발급
//            token = jwtProvider.create(userId, "AT");
//
//            // 레디스에서 리프레시토큰 가져오기.
//            refreshToken = redisService.getData(userId);
//
//            if (refreshToken == null) {                     // 리프레시 토큰이 없는 경우 새로 발급
//                // refreshToken만들고 저장하는 메서드 호출(userId)
//                refreshToken = jwtProvider.createSaveRefreshToken(userId);
//            }

            //=========================================================================
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignInResDto.success(token, refreshToken);
    }

//    @Override
//    public void emailUrl(String email) {
//        try{
//            boolean isSuccess = emailProvider.sendMail(email);
//            if(!isSuccess) {
//                logger.info("** 없는 이메일 ");
//            }
//
//        }catch (Exception e){
//            logger.info(e.getMessage());
//
//        }
//        logger.info("** 이메일 전송");
//    }
//
//    @Override
//    public ResponseEntity<?> emailModify(String email, String password) {
//        try {
//            User user = userRepository.findByEmail(email);
//            String newPassword = passwordEncoder.encode(password);
//            user.setPassword(newPassword);
//            userRepository.save(user);
//
//            return ResponseDto.ok();
//        }catch (Exception e){
//            logger.info(e.getMessage());
//            return ResponseDto.databaseError();
//        }
//    }


//    @Override // 휴대폰 번호로 인증번호 발급해준다
//    public ResponseEntity<? super PhoneCertificationResponseDto> phoneCertification(PhoneCertificationRequestDto dto) {
//        try {
//            String phoneId = dto.getPhoneId();
//
//            boolean isExistId = userRepository.existsByPhone(phoneId); //<==============
//            if(isExistId) return PhoneCertificationResponseDto.duplicateId();
//
//            String certificationNumber = CertificationNumber.getCertificationNumber();
//            boolean isSuccess = phoneProvider.sendCertificationPhone(phoneId, certificationNumber);
//            if(!isSuccess) return PhoneCertificationResponseDto.mailSendFail();
//
//            PhoneCertification phonecertification = new PhoneCertification(phoneId, certificationNumber);
//            phoneCertificationRepository.save(phonecertification);
//        } catch (Exception exception) {
//            exception.printStackTrace();
//            return ResponseDto.databaseError();
//        }
//        return PhoneCertificationResponseDto.success();
//    }
//
//    @Override
//    public ResponseEntity<? super CheckPhoneCertificationResDto> checkPhoneCertification(CheckPhoneCertificationReqDto dto) {
//        try {
////            String certificationId = dto.getCertificationId();
////            String phone = dto.getPhone();
//            String phoneId = dto.getPhoneId();
//            String certificationNumber = dto.getCertificationNumber();
//
//            PhoneCertification phoneCertification = phoneCertificationRepository.findByPhoneId(phoneId);
//            if (phoneCertification == null) return CheckPhoneCertificationResDto.fail();
//
//            if (!isPhoneMatched(phoneCertification, phoneId, certificationNumber)) {
//                return SignUpResDto.fail();
//            }
//        } catch (Exception exception) {
//            exception.printStackTrace();
//            return ResponseDto.databaseError();
//        }
//        return CheckPhoneCertificationResDto.success();
//    }

    // 회원 아이디가 존재하는지 확인
    private  boolean isExistUserId(String userId){
        return userRepository.existsByUserId(userId);
    }
    // 회원 이메일이 존재하는지 확인
    private boolean isExistUserEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    // 회원 전화번호가 존재하는지 확인
    private boolean isExistUserPhone(String phone) {
        return userRepository.existsByPhone(phone);
    }

    private boolean isMatched(Certification certification,String email, String CertificationNumber){
        return certification.getEmail().equals(email) &&
                certification.getCertificationNumber().equals(CertificationNumber);
    }

    private boolean isPhoneMatched(PhoneCertification phoneCertification, String phone, String certificationNumber) {
        return phoneCertification.getPhoneId().equals(phone) &&
                phoneCertification.getCertificationNumber().equals(certificationNumber);
    }
}
