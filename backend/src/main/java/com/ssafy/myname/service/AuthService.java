package com.ssafy.myname.service;

import com.ssafy.myname.dto.request.auth.IdCheckRequestDto;
import com.ssafy.myname.dto.response.auth.IdCheckResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto);
}
