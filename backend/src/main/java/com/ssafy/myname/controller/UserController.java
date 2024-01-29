package com.ssafy.myname.controller;

import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.RefreshTokenRepository;
import com.ssafy.myname.dto.request.auth.RefreshTokenDto;
import com.ssafy.myname.dto.response.ResponseDto;
import com.ssafy.myname.dto.response.auth.GetUserInfoResDto;
import com.ssafy.myname.provider.JwtProvider;
import com.ssafy.myname.service.AuthService;
import com.ssafy.myname.service.UserService;
import com.ssafy.myname.service.implement.AuthServiceImpl;
import com.ssafy.myname.service.implement.JwtService;
import com.ssafy.myname.service.implement.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProvider jwtProvider;
    private final AuthServiceImpl authServiceImpl;
    private final JwtService jwtService;
    private final UserService userService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    //    @GetMapping("/{userId}")
//    public String getUser(@PathVariable("userId") String userId){
//        System.out.println("userId = " + userId);
//        return userId;
//    }
    @PostMapping("/get-user-info")
    public ResponseEntity<?> getUserInfo(Principal principal) {
    logger.info("** getUserInfo Controller 실행");
        try {
            GetUserInfoResDto response = userService.getUserInfo(principal);
            // 여기서 response의 body 타입이 클라이언트의 Accept 헤더와 일치하는지 확인합니다.
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            logger.info(e.getMessage());
            // 예외 발생 시 클라이언트에게 보낼 에러 메시지를 JSON 형식으로 구성합니다.
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "User not found");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorBody);
        }
    }



}
