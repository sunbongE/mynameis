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

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AlarmService alarmService;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    /**
     *
     * @param principal 어떤회원인지 식별할 수 있습니다.
     * @return 회원정보를 반환합니다.
     */
    @PostMapping("/get-user-info")
    public ResponseEntity<?> getUserInfo(Principal principal) {
    logger.info("** getUserInfo Controller 실행");
        try {
            GetUserInfoResDto response = userService.getUserInfo(principal);
            // 여기서 response의 body 타입이 클라이언트의 Accept 헤더와 일치하는지 확인합니다.
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            logger.info(e.getMessage());
            // 예외 발생 시 클라이언트에게 보낼 에러 메시지를 JSON 형식으로 구성합니다.
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "User not found");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorBody);
        }
    }

    /**
     *
     * @param principal
     * @param tags tags라는 이름으로 태그이름들이 있는 리스트
     * @return 변경에 대한 상태를 반환합니다. 성공이나 실패
     */
    @PutMapping("/modify-tag")
    public ResponseEntity<?> modifyTag(Principal principal,
                                       @RequestBody Map<String, List<String>> tags) {
        logger.info("** modify-tag 호출");
        try{
            List<String> tagNameList = tags.get("tags");
            String userId = principal.getName();
            ResponseEntity<?> response = userService.modifyTag(userId,tagNameList);
            return response;
        }catch (Exception e){
            logger.info(e.getMessage());
            return ResponseDto.databaseError();
        }
    }

    @PutMapping("/modify-user")
    public ResponseEntity<?> modifyUser(Principal principal,
                                        @RequestBody ModifyUserDto modifyUserDto){
        logger.info("** modify-user 호출");
        try{
            String userId = principal.getName();
            ResponseEntity<?> response = userService.modifyUser(userId,modifyUserDto);
            return response;
        }catch (Exception e){
            logger.info(e.getMessage());
            return ResponseDto.databaseError();
        }

    }

    /**
     * 회원의 isLeave속성을 true으로 변경하여 탈퇴한 유저임을 기록한다.
     * @param principal
     * @return
     */
    @PatchMapping("/leave")
    public ResponseEntity<?> leave (Principal principal){
        logger.info("** leave-user 호출");
        try {
            String userId = principal.getName();
            ResponseEntity<?> response = userService.leave(userId);
            return response;
        } catch (Exception e) {
            logger.info(e.getMessage());
            return ResponseDto.databaseError();
        }
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
