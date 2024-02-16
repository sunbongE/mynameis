package com.ssafy.myname.controller;

import com.ssafy.myname.db.entity.Tags;
import com.ssafy.myname.db.entity.User;
//import com.ssafy.myname.db.repository.RefreshTokenRepository;
import com.ssafy.myname.db.repository.TagRepository;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.request.alarm.ReadAlarmDto;
import com.ssafy.myname.dto.request.auth.RefreshTokenDto;
import com.ssafy.myname.dto.request.users.ModifyUserDto;
import com.ssafy.myname.dto.request.users.PasswordChangeDto;
import com.ssafy.myname.dto.response.ResponseDto;
import com.ssafy.myname.dto.response.auth.GetUserInfoResDto;
import com.ssafy.myname.provider.JwtProvider;
//import com.ssafy.myname.service.AlarmService;
import com.ssafy.myname.service.AlarmService;
import com.ssafy.myname.service.AuthService;
import com.ssafy.myname.service.UserService;
import com.ssafy.myname.service.implement.AuthServiceImpl;
//import com.ssafy.myname.service.implement.JwtService;
import com.ssafy.myname.service.implement.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AlarmService alarmService;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/{userId}")
    public String getUser(@PathVariable("userId") String userId){
        System.out.println("userId = " + userId);
        return userId;
    }
    @PostMapping("/")
    public String getUser( ){
        return "/";
    }
    @GetMapping("/aa")
    public String aa(){
        return "aa";
    }

    /**
     * 아직 읽지않은 알람 가져오기.
     * @param principal
     * @return
     */
    @GetMapping("/alarm")
    public ResponseEntity<?> getAlarm(Principal principal){
        logger.info("** getAlarm 실행");
        String userId = principal.getName();
        try{
            ResponseEntity<?> response = alarmService.getAlarm(userId);
            return response;
        }catch (Exception e){
            logger.info(e.getMessage());
            return ResponseDto.databaseError();
        }
    }

    /**
     * 알람 읽음처리하는 로직
     * @param dto
     * @return
     */
    @PostMapping("/read")
    public ResponseEntity<?> readAlarm(@RequestBody ReadAlarmDto dto){
        List<Long> alarmsId = dto.getAlarmsId();
        try {
            if(alarmsId.size()==0) return null;

            ResponseEntity<?> response = alarmService.readAlarm(alarmsId);
            return response;

        }catch (Exception e){
            logger.info(e.getMessage());
            return ResponseDto.databaseError();
        }
    }



}
