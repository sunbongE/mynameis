package com.ssafy.myname.provider;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.myname.dto.response.ResponseDto;
//import com.ssafy.myname.service.RedisService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtProvider {

//    private final RedisService redisService;

    @Value("${secret-key}")
    private String secretKey;
    public String create(String userId){

    public String create(String userId, String type) {
        Date expiredDate;
        if (type.equals("AT")) {
            expiredDate = Date.from(Instant.now().plus(24, ChronoUnit.HOURS)); // 24시간
        } else {
            expiredDate = Date.from(Instant.now().plus(15, ChronoUnit.DAYS)); // 15일.
        }

        String jwt = Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject(userId).setIssuedAt(new Date()).setExpiration(expiredDate)
                .compact();
        return jwt;
    }
    public String validate(String jwt){
        String userId;
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();

            userId = claims.getSubject();

        }catch (Exception exception){
            exception.printStackTrace();
            return null;
        }
        return userId;
    }

    public String createSaveRefreshToken(String userId) {
        String refreshToken = create(userId, "RT");
//        redisService.setDataExpire(userId, refreshToken, 60 * 60 * 24 * 15); // 저장 15동안.
        return refreshToken;
    }

    public String resolveRefreshToken(HttpServletRequest request) {
        String refreshToken = request.getHeader("Authorization");
        if (refreshToken != null && refreshToken.startsWith("Bearer ")) {
            refreshToken = refreshToken.substring(7);

            return refreshToken;
        }

        return null;
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);}



}
