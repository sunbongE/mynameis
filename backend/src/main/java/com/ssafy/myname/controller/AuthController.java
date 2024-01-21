package com.ssafy.myname.controller;

import com.ssafy.myname.dto.request.auth.*;
import com.ssafy.myname.dto.response.auth.*;
import com.ssafy.myname.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/id-check")
    public ResponseEntity<? super IdCheckResponseDto> idCheck(@RequestBody @Valid IdCheckRequestDto requestBody){
        ResponseEntity<? super IdCheckResponseDto> response = authService.idCheck(requestBody);
        return response;
    }
    @PostMapping("/email-certification")
    public ResponseEntity<? super EmailCertificationResponseDto> emailcertification(
            @RequestBody @Valid EmailCertificationRequestDto requestBody
            ){
        ResponseEntity<? super EmailCertificationResponseDto> response =
                authService.emilCertification(requestBody);
        return response;
    }

    @PostMapping("/check-certification")
    public ResponseEntity<? super CheckCertificationResDto> checkCertification(
            @RequestBody @Valid CheckCertificationReqDto requestBody
            ) {
        ResponseEntity<? super CheckCertificationResDto> response = authService.checkCertification(requestBody);
        return response;
    }
    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResDto> signUp(
            @RequestBody @Valid SignUpReqDto reqBody
            ){

        ResponseEntity<? super SignUpResDto> response = authService.signUp(reqBody);
        return response;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResDto> signIn(
            @RequestBody @Valid SignInReqDto reqBody
    ){
        ResponseEntity<? super SignInResDto> response = authService.signIn(reqBody);
        return  response;
    }
}
