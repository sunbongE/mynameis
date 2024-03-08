package com.ssafy.myname.service;

import com.ssafy.myname.dto.request.users.ModifyUserDto;
import com.ssafy.myname.dto.response.auth.GetUserInfoResDto;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.List;

public interface UserService {
    GetUserInfoResDto getUserInfo(Principal principal);
    ResponseEntity<?> modifyTag(String userId, List<String> tagNameList);
    ResponseEntity<?> modifyUser(String userId, ModifyUserDto modifyUserDto);
    ResponseEntity<?> leave(String userId);
    void increaseReportPoint(String userId);
    void addCoins(int coins, String userId);
    void useCoin(String userId, int coin);
}

