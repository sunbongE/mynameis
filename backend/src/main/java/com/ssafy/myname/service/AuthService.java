package com.ssafy.myname.service;

import com.ssafy.myname.dto.request.auth.CheckCertificationReqDto;
import com.ssafy.myname.dto.request.auth.EmailCertificationRequestDto;
import com.ssafy.myname.dto.request.auth.IdCheckRequestDto;
import com.ssafy.myname.dto.request.auth.SignUpReqDto;
import com.ssafy.myname.dto.response.auth.CheckCertificationResDto;
import com.ssafy.myname.dto.response.auth.EmailCertificationResponseDto;
import com.ssafy.myname.dto.response.auth.IdCheckResponseDto;
import com.ssafy.myname.dto.response.auth.SignUpResDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto);
    ResponseEntity<? super EmailCertificationResponseDto> emilCertification(EmailCertificationRequestDto dto);

    ResponseEntity<? super CheckCertificationResDto> checkCertification(CheckCertificationReqDto dto);


    ResponseEntity<? super SignUpResDto> signUp(SignUpReqDto dto);




}
