package com.ssafy.myname.controller;

import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.RefreshTokenRepository;
import com.ssafy.myname.dto.request.auth.RefreshTokenDto;
import com.ssafy.myname.dto.response.ResponseDto;
import com.ssafy.myname.provider.JwtProvider;
import com.ssafy.myname.service.AuthService;
import com.ssafy.myname.service.implement.AuthServiceImpl;
import com.ssafy.myname.service.implement.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/redis")
@RequiredArgsConstructor
public class UserController {
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProvider jwtProvider;
    private final AuthServiceImpl authServiceImpl;
    private final JwtService jwtService;
    @GetMapping("/{userId}")
    public String getUser(@PathVariable("userId") String userId){
        System.out.println("userId = " + userId);
        return userId;
    }

//    @PostMapping(value = "/hasUser") // 리프레시 토큰이 있으면 해당 토큰으로
//    public ResponseEntity<? super Boolean> hasUser(Principal principal)
//    {
//        Boolean result = jwtService.hasUser(principal);
//        if(result){
//            return ResponseEntity.ok("유효한 토큰");
//        }else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("토큰이 없습니다.");
//        }
//    }

}
