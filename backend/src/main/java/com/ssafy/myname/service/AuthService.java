package com.ssafy.myname.service;

import com.ssafy.myname.dto.request.auth.*;
import com.ssafy.myname.dto.response.auth.*;
import org.springframework.http.ResponseEntity;

import java.security.Principal;

public interface AuthService {

    ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto);
    // 이메일로 인증번호 전송.
    ResponseEntity<? super EmailCertificationResponseDto> emilCertification(EmailCertificationRequestDto dto);

    // 휴대폰 인증
    ResponseEntity<? super CheckCertificationResDto> checkCertification(CheckCertificationReqDto dto);

    // 회원가입
    ResponseEntity<? super SignUpResDto> signUp(SignUpReqDto dto);
    // 로그인
    ResponseEntity<? super SignInResDto> signIn(SignInReqDto dto);




}
