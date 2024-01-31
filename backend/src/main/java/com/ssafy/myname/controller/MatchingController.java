package com.ssafy.myname.controller;

import com.ssafy.myname.db.entity.MatchStatus;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.response.matching.MatchingAcceptResponseDto;
import com.ssafy.myname.provider.MatchingProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/matching")
@RequiredArgsConstructor
public class MatchingController {
    private final MatchingProvider matchingProvider;
    private final UserRepository userRepository;


    /**
     * 사용자가 매칭요청을 하면 매칭 프로바이더의 큐 안으로 들어가게 되어 대기 상태가된다.
     * 사용자의 속성중 setMatchStatus를 Matching으로 변경해준다.
     *
     * @param principal
     * @return
     */
    @PostMapping("/join")
    public ResponseEntity<?> matchingJoin(Principal principal) {
        try {
            String userId = principal.getName();
            // 사용자의 상태 변경.
            User user = userRepository.findByUserId(userId);
            if(user.getMatchStatus().equals(MatchStatus.MATCHED) || user.getMatchStatus().equals(MatchStatus.MATCHING)){
                return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MatchingAcceptResponseDto.already());
            }
            user.setMatchStatus(MatchStatus.MATCHING);
            userRepository.save(user);

            // 남여 구분해서 큐에 삽입
            if (user.getGender()) {
                matchingProvider.addMQue(userId);
            } else {
                matchingProvider.addWQue(userId);
            }
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(MatchingAcceptResponseDto.join());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(MatchingAcceptResponseDto.fail());
        }
    }

    @PostMapping("/cancle")
    public ResponseEntity<?> matchingCancle(Principal principal) {
        try {
            String userId = principal.getName();
            // 사용자의 상태 변경.
            User user = userRepository.findByUserId(userId);
            user.setMatchStatus(MatchStatus.READY);
            userRepository.save(user);

            // 남여 구분해서 큐에서 제거.
            if (user.getGender()) {
                matchingProvider.removeM(userId);
            } else {
                matchingProvider.removeW(userId);
            }
            // 큐에 삽입
            return ResponseEntity.status(HttpStatus.OK).body(MatchingAcceptResponseDto.cancle());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(MatchingAcceptResponseDto.fail());
        }
    }


}
