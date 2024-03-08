package com.ssafy.myname.controller;

import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.request.auth.*;
import com.ssafy.myname.dto.request.users.PasswordChangeDto;
import com.ssafy.myname.dto.response.auth.*;
import com.ssafy.myname.dto.response.email.EmailResponseDto;
import com.ssafy.myname.provider.JwtProvider;
import com.ssafy.myname.service.AuthService;
//import com.ssafy.myname.service.implement.JwtService;
import com.ssafy.myname.service.implement.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    @Value("${secret-key}")
    private String secretKey;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.status(HttpStatus.OK).body("back 연결성공");
    }


    /**
     *
     * @param requestBody :
     * @return
     */
    @PostMapping("/id-check")
    public ResponseEntity<? super IdCheckResponseDto> idCheck(@RequestBody @Valid IdCheckRequestDto requestBody){
        ResponseEntity<? super IdCheckResponseDto> response = authService.idCheck(requestBody);
        return response;
    }




//    @PostMapping("/phone-certification")
//    public ResponseEntity<? super PhoneCertificationResponseDto> phonecerfitication(
//            @RequestBody @Valid PhoneCertificationRequestDto requestBody
//    ) {
//        logger.info("requestBody : {}", requestBody);
//        ResponseEntity<? super PhoneCertificationResponseDto> response =
//                authService.phoneCertification(requestBody);
//        return response;
//    }


//    @PostMapping("/check-phonecertification")
//    public ResponseEntity<? super CheckPhoneCertificationResDto> checkPhoneCertification(
//            @RequestBody @Valid CheckPhoneCertificationReqDto requestBody
//    ) {
//        ResponseEntity<? super CheckPhoneCertificationResDto> response = authService.checkPhoneCertification(requestBody);
//        return response;
//    }

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
    /**
     * 회원의 비밀번호 변경가능한 페이지로 이동한다.
     */
    @PostMapping("/change")
    public ResponseEntity<?> emailUrl(@RequestBody ChangeUrlReqDto dto){
        Map<String,String> response = new HashMap<>();
        try{
            User user = userRepository.findByUserId(dto.getUserId());
            String email = user.getEmail();
            if(user!=null && dto.getEmail().equals(email)){
//                sendEmail(dto.getEmail());

                response.put("msg","이메일 발송");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
            response.put("msg","없는 회원 정보입니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }catch (Exception e){

            response.put("msg",e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Async
    protected void sendEmail(String email) {
        authService.emailUrl(email);
    }

    @PatchMapping("/change")
    public ResponseEntity<?> emailModify(@RequestBody PasswordChangeDto dto,@RequestParam("email") String email){

        ResponseEntity<?> response = authService.emailModify(email, dto.getPassword());
        return response;
    }

}
