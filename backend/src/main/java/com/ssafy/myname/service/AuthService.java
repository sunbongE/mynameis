package com.ssafy.myname.service;

import com.ssafy.myname.dto.request.auth.*;
import com.ssafy.myname.dto.response.auth.*;
import com.ssafy.myname.dto.response.email.EmailResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto);
    // 이메일로 인증번호 전송.

    // 휴대폰 인증

    // 휴대폰 인증
    ResponseEntity<? super PhoneCertificationResponseDto> phoneCertification(PhoneCertificationRequestDto dto);

    // 휴대폰 인증
    ResponseEntity<? super CheckPhoneCertificationResDto> checkPhoneCertification(CheckPhoneCertificationReqDto dto);

    // 회원가입
    ResponseEntity<? super SignUpResDto> signUp(SignUpReqDto dto);
    // 로그인
    ResponseEntity<? super SignInResDto> signIn(SignInReqDto dto);
    void emailUrl(String userId);


    ResponseEntity<?> emailModify(String email, String password);



}
