package com.ssafy.myname.service;

import com.ssafy.myname.dto.response.auth.GetUserInfoResDto;
import org.springframework.http.ResponseEntity;

import java.security.Principal;

public interface UserService {
    GetUserInfoResDto getUserInfo(Principal principal);

}
