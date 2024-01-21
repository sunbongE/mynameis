package com.ssafy.myname.service.implement;

import com.ssafy.myname.commons.CertificationNumber;
import com.ssafy.myname.db.entity.Certification;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.CertificationRepository;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.request.auth.CheckCertificationReqDto;
import com.ssafy.myname.dto.request.auth.EmailCertificationRequestDto;
import com.ssafy.myname.dto.request.auth.IdCheckRequestDto;
import com.ssafy.myname.dto.request.auth.SignUpReqDto;
import com.ssafy.myname.dto.response.ResponseDto;
import com.ssafy.myname.dto.response.auth.CheckCertificationResDto;
import com.ssafy.myname.dto.response.auth.EmailCertificationResponseDto;
import com.ssafy.myname.dto.response.auth.IdCheckResponseDto;
import com.ssafy.myname.dto.response.auth.SignUpResDto;
import com.ssafy.myname.provider.EmailProvider;
import com.ssafy.myname.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final CertificationRepository certificationRepository;
    private final EmailProvider emailProvider;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    private final Logger LOGGER = (Logger) LoggerFactory.getLogger(this.getClass());

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
    public ResponseEntity<? super EmailCertificationResponseDto> emilCertification(EmailCertificationRequestDto dto) {
        try{

            String userId = dto.getUserId();
            String email = dto.getEmail();

            boolean isExistId = userRepository.existsByUserId(userId);
            if(isExistId) return EmailCertificationResponseDto.duplicateId();

            String certificationNumber = CertificationNumber.getCertificationNumber();
            boolean isSuccess =emailProvider.sendCertificationMail(email,certificationNumber);
            if(!isSuccess) return EmailCertificationResponseDto.mailSendFail();

            Certification certification = new Certification(userId, email, certificationNumber );
            certificationRepository.save(certification);

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return EmailCertificationResponseDto.success();
    }

    @Override
    public ResponseEntity<? super CheckCertificationResDto> checkCertification(CheckCertificationReqDto dto) {
        try {
            String userId = dto.getUserId();
            String email = dto.getEmail();
            String certificationNumber = dto.getCertificationNumber();

            Certification certification = certificationRepository.findByUserId(userId);
            if(certification==null) return CheckCertificationResDto.fail();

            if(!isMatched(certification, email, certificationNumber)){
                return SignUpResDto.fail();
            }
//            boolean isMatched = certification.getEmail().equals(email) && certification.getCertificationNumber().equals(certificationNumber);
//            if(!isMatched) return  CheckCertificationResDto.fail();

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return CheckCertificationResDto.success();
    }

    @Override
    public ResponseEntity<? super SignUpResDto> signUp(SignUpReqDto dto) {
        LOGGER.info("signUp, dto:{}",dto.toString());
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
            certificationRepository.deleteByUserId(userId); //회원가입성공한 회원에대한 정보삭제.

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResDto.success();
    }

    private  boolean isExistUserId(String userId){
        return userRepository.existsByUserId(userId);
    }
    private boolean isMatched(Certification certification,String email, String CertificationNumber){
        return certification.getEmail().equals(email) &&
                certification.getCertificationNumber().equals(CertificationNumber);
    }

}
