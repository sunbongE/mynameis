package com.ssafy.myname.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.response.ResponseDto;
import com.ssafy.myname.provider.JwtProvider;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.DataOutput;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;

    private final UserRepository userRepository;
    @Override // 여기서 요청을 바탕으로 사용자 정보까고 비교,
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            String token = parseBearerToken(request);
            if(token==null){
                filterChain.doFilter(request,response);
                return;
            }

            String userId = jwtProvider.validate(token);

//            if(!jwtProvider.isTokenExpired(token)){
//                System.out.println("????????????");
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
//                response.setContentType("application/json");
//                response.getWriter().write(new ObjectMapper().writeValueAsString(ResponseDto.validationFail()));
//                return;
//            }

            if(userId==null){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
                response.setContentType("application/json");
                response.getWriter().write(new ObjectMapper().writeValueAsString(ResponseDto.expiration()));
                filterChain.doFilter(request,response);
                return;
            }

            User user = userRepository.findByUserId(userId);
            String role = String.valueOf(user.getRole()); // role : ROLE_USER, ROLE_VIP, ROLE_ADMIN
//            System.out.println("role = " + role);
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(role));

            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

            AbstractAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userId,null,authorities);
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            securityContext.setAuthentication(authenticationToken);
            SecurityContextHolder.setContext(securityContext);

        }catch (Exception exception){
            exception.printStackTrace();
        }
        filterChain.doFilter(request,response);
    }

    private String parseBearerToken(HttpServletRequest request){
        String authorization = request.getHeader("Authorization");
        boolean hasAuthorization = StringUtils.hasText(authorization);
        if(!hasAuthorization){
            return null;
        }
        boolean isBearer = authorization.startsWith("Bearer ");
        if (!isBearer) return null;

        String token = authorization.substring(7);
        return token;

    }
}
