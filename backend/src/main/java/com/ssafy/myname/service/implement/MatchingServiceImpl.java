package com.ssafy.myname.service.implement;

import com.ssafy.myname.db.entity.MatchStatus;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.entity.matching.JoinInfo;
import com.ssafy.myname.db.repository.JoinInfoRepository;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.response.matching.MatchingAcceptResponseDto;
import com.ssafy.myname.provider.MatchingProvider;
import com.ssafy.myname.service.MatchingService;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@DynamicInsert
public class MatchingServiceImpl implements MatchingService {
    private final MatchingProvider matchingProvider;
    private final UserRepository userRepository;
    private final JoinInfoRepository joinInfoRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());



    @Override
    public ResponseEntity<?> twoMatchingJoin(String userId) {
        // 사용자의 상태 변경.
        User user = userRepository.findByUserId(userId);
        if (user.getMatchStatus().equals(MatchStatus.MATCHED) || user.getMatchStatus().equals(MatchStatus.MATCHING)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MatchingAcceptResponseDto.already());
        }
        user.setMatchStatus(MatchStatus.MATCHING);
        userRepository.save(user);

        // 남여 구분해서 큐에 삽입
        if (user.getGender()) {
            matchingProvider.queTwoAddMan(userId);
        } else {
            matchingProvider.queTwoAddWoman(userId);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(MatchingAcceptResponseDto.join());
    }

    @Override
    public ResponseEntity<?> matchingCancle(String userId) {
        // 사용자의 상태 변경.
        User user = userRepository.findByUserId(userId);
        user.setMatchStatus(MatchStatus.READY);
        userRepository.save(user);

        // 남여 구분해서 큐에서 제거.
        if (user.getGender()) {
            matchingProvider.queTwoRemoveMan(userId);
        } else {
            matchingProvider.queTwoRemoveWoman(userId);
        }
        // 큐에 삽입
        return ResponseEntity.status(HttpStatus.OK).body(MatchingAcceptResponseDto.cancle());
    }

    /**
     * 참여정보에 내가 있는지 확인하는 로직.
     * 내가 있으면 방번호, 입장토큰 넘겨준다.
     *
     * @param userId
     * @return
     */
    @Override
    public ResponseEntity<?> check(String userId) throws OpenViduJavaClientException, OpenViduHttpException {
        logger.info("** check함수 실행!! ");
        logger.info("userId :{}", userId);
        Map<String, String> body = new HashMap<>();

        User user = userRepository.findByUserId(userId);
        Optional<JoinInfo> opJoinInfo = joinInfoRepository.findByUser(user);

        Long roomId = null;
        String token =null;
        if (opJoinInfo.isPresent()) { // 매칭이 잡힌 상태

            JoinInfo myJoinInfo = opJoinInfo.get();
            roomId = myJoinInfo.getRoom().getRoomId();
            token = myJoinInfo.getToken();
            logger.info("myJoinInfo : {}", roomId);
            body.put("roomId", roomId.toString());
            body.put("token", token);
            return ResponseEntity.status(HttpStatus.OK).body(body);

        }else { // 안잡힌 상태
            body.put("msg", "아직 대기중");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(body);
        }
    }
}
