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
    void emailUrl(String userId);


    ResponseEntity<?> emailModify(String userId, String password);
    void increaseReportPoint(String userId);
}
