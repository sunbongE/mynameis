package com.ssafy.myname.service.implement;

import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.provider.JwtProvider;
import com.ssafy.myname.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final JwtProvider jwtProvider;
    private final RedisService redisService;
    private final UserRepository userRepository;

    /**
     *
     * @param principal
     * @return 요청한 회원 엔터티를 리턴합니다.
     */

    public User getUser(Principal principal) {
        User user = userRepository.findByUserId(principal.getName());
        if(user==null) return null;
        return user;
    }

    /**
     *
     * @param principal
     * @return 요청한 회원의 아이디를 리턴합니다.
     */
    public String getUserId(Principal principal) {
        String userId = principal.getName();
        return userId;
    }


    /**
     *
     * @param userId
     * @return 레디스에서 회원의 리프레시토큰을 가져옵니다. 없는경우 null반환.
     */
    private String getRefreshToken(String userId) {
        return redisService.getData(userId);
    }

}
