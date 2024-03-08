package com.ssafy.myname.service.implement;

import com.ssafy.myname.commons.CertificationNumber;
import com.ssafy.myname.db.entity.Certification;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.CertificationRepository;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.request.auth.*;
import com.ssafy.myname.dto.response.ResponseDto;
import com.ssafy.myname.dto.response.auth.*;
import com.ssafy.myname.dto.response.email.EmailResponseDto;
//import com.ssafy.myname.provider.EmailProvider;
import com.ssafy.myname.provider.EmailProvider;
import com.ssafy.myname.provider.JwtProvider;
//import com.ssafy.myname.provider.PhoneProvider;
import com.ssafy.myname.provider.PhoneProvider;
import com.ssafy.myname.service.AuthService;
//import com.ssafy.myname.service.RedisService;
import com.ssafy.myname.service.RedisService;
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
    private final EmailProvider emailProvider;
    private final JwtProvider jwtProvider;
    private final RedisService redisService;
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




    @Override
    public ResponseEntity<? super SignUpResDto> signUp(SignUpReqDto dto) {
        logger.info("signUp, dto:{}",dto.toString());
        try {

            String userId = dto.getUserId();
            if(isExistUserId(userId)) return SignUpResDto.duplicateId();//이미 있는 아이디인경우.

            String email = dto.getEmail();
            String certificationNumber = dto.getCertificationNumber();

            Certification certification = certificationRepository.findByUserId(userId);
            System.out.println("certification.toString() = " + certification.toString());
            System.out.println("SignUpReqDto = " + dto.toString());
            if(!isMatched(certification, email, certificationNumber)){
                return SignUpResDto.fail();
            }

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            User user = new User(dto);
//            System.out.println("user = " + user.toString());
//            System.out.println(user.getPassword().length());
            LOGGER.info("[signUp], user:{}",user.toString());
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

    @Override
    public ResponseEntity<? super SignInResDto> signIn(SignInReqDto dto) {
        String token = null;

        try{

            String userId = dto.getUserId();
            User user = userRepository.findByUserId(userId);
            if(user==null) return SignInResDto.fail();

            String password = dto.getPassword();
            String encodedPassword =user.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if(!isMatched) return SignInResDto.fail();

            //=========================================================================
            // 엑세스 토큰 발급
            token = jwtProvider.create(userId, "AT");

            // 레디스에서 리프레시토큰 가져오기.
            refreshToken = redisService.getData(userId);

            if (refreshToken == null) {                     // 리프레시 토큰이 없는 경우 새로 발급
                // refreshToken만들고 저장하는 메서드 호출(userId)
                refreshToken = jwtProvider.createSaveRefreshToken(userId);
            }

            //=========================================================================
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignInResDto.success(token);
    }

    @Override
    public void emailUrl(String email) {
        try{
            boolean isSuccess = emailProvider.sendMail(email);
            if(!isSuccess) {
                logger.info("** 없는 이메일 ");
            }

        }catch (Exception e){
            logger.info(e.getMessage());

        }
        logger.info("** 이메일 전송");
    }

    @Override
    public ResponseEntity<?> emailModify(String email, String password) {
        try {
            User user = userRepository.findByEmail(email);
            String newPassword = passwordEncoder.encode(password);
            user.setPassword(newPassword);
            userRepository.save(user);

            return ResponseDto.ok();
        }catch (Exception e){
            logger.info(e.getMessage());
            return ResponseDto.databaseError();
        }
    }

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

}
