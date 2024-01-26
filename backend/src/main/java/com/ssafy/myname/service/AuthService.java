package com.ssafy.myname.service;

import com.ssafy.myname.dto.request.auth.*;
import com.ssafy.myname.dto.response.auth.*;
import org.springframework.http.ResponseEntity;

import java.security.Principal;

public interface AuthService {

    ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto);
    ResponseEntity<? super EmailCertificationResponseDto> emilCertification(EmailCertificationRequestDto dto);

    ResponseEntity<? super CheckCertificationResDto> checkCertification(CheckCertificationReqDto dto);

    ResponseEntity<? super SignUpResDto> signUp(SignUpReqDto dto);
    ResponseEntity<? super SignInResDto> signIn(SignInReqDto dto);




}
