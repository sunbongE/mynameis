package com.ssafy.myname.controller;

import com.ssafy.myname.dto.request.auth.*;
import com.ssafy.myname.dto.response.auth.*;
import com.ssafy.myname.provider.JwtProvider;
import com.ssafy.myname.service.AuthService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtProvider jwtProvider;
    private final AuthService authService;
    @Value("${secret-key}")
    private String secretKey;

    @PostMapping("/id-check")
    public ResponseEntity<? super IdCheckResponseDto> idCheck(@RequestBody @Valid IdCheckRequestDto requestBody) {
        ResponseEntity<? super IdCheckResponseDto> response = authService.idCheck(requestBody);
        return response;
    }

    @PostMapping("/email-certification")
    public ResponseEntity<? super EmailCertificationResponseDto> emailcertification(
            @RequestBody @Valid EmailCertificationRequestDto requestBody
    ) {
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
    ) {

        ResponseEntity<? super SignUpResDto> response = authService.signUp(reqBody);
        return response;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResDto> signIn(
            @RequestBody @Valid SignInReqDto reqBody
    ) {
        ResponseEntity<? super SignInResDto> response = authService.signIn(reqBody);
        return response;
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        String encryptedRefreshToken = jwtProvider.resolveRefreshToken(request);
//        System.out.println("encryptedRefreshToken = " + encryptedRefreshToken);
        String newAccessToken;
        try {
            // RefreshToken 검증
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(encryptedRefreshToken);

            // RefreshToken에서 사용자 아이디 추출
            String userId = claims.getBody().getSubject();
            newAccessToken = jwtProvider.create(userId, "AT");

        } catch (ExpiredJwtException e) { // 여기서 재 로그인 요청.
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token is expired. Please log in again.");
        }
        return NewAccessTokenResDto.success(newAccessToken,"AccessToken");
    }


}