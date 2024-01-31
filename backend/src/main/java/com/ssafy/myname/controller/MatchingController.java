package com.ssafy.myname.controller;

import com.ssafy.myname.db.entity.MatchStatus;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.request.matching.MatchJoinRequestDto;
import com.ssafy.myname.dto.response.matching.MatchingAcceptResponseDto;
import com.ssafy.myname.provider.MatchingProvider;
import com.ssafy.myname.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/matching")
@RequiredArgsConstructor
public class MatchingController {
    private final MatchingService matchingService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 사용자가 매칭요청을 하면 매칭 프로바이더의 큐 안으로 들어가게 되어 대기 상태가된다.
     * 사용자의 속성중 setMatchStatus를 Matching으로 변경해준다.
     *
     * @param principal
     * @return
     */
    @PostMapping("/join")
    public ResponseEntity<?> matchingJoin(Principal principal, @RequestBody MatchJoinRequestDto dto) throws InterruptedException {
        logger.info("dto : {}",dto);
        logger.info("** 매칭 요청 실행 타입 :{}",dto.getType());
        String userId = principal.getName();
        try {
            if (dto.getType().equals("two")) {
                ResponseEntity<?> response = matchingService.twoMatchingJoin(userId);
                return response;
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("아직 구현 안했어요.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(MatchingAcceptResponseDto.fail());
        }
    }

    @PostMapping("/cancle")
    public ResponseEntity<?> matchingCancle(Principal principal) {
            String userId = principal.getName();
        try {
            ResponseEntity<?> response = matchingService.matchingCancle(userId);
            return response;

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(MatchingAcceptResponseDto.fail());
        }
    }

    @GetMapping("/matched")
    private ResponseEntity<?> didItMatch(Principal principal) {
        String userId = principal.getName();
        try{
            ResponseEntity<?> response = matchingService.didItMatch(userId);
            return response;

        }catch (Exception e){
            Map<String,String> body = new HashMap<>();
            body.put("msg",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
        }
    }


}
