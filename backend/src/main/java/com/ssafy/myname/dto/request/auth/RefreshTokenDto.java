package com.ssafy.myname.dto.request.auth;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;
@Getter
@RedisHash(value="refreshToken",timeToLive = 60*60*24*15) // 15 days
public class RefreshTokenDto {
    @Id
    private String userId;

    @Indexed
    private String token;

    public RefreshTokenDto() {}

    public RefreshTokenDto(String userId, String token) {
        this.userId = userId;
        this.token = token;
        System.out.println("token = " + token);
    }
}
