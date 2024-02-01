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
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@DynamicInsert
public class MatchingServiceImpl implements MatchingService {
    private final MatchingProvider matchingProvider;
    private final UserRepository userRepository;
    private final JoinInfoRepository joinInfoRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }


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
     * 현재 내가 매칭확정 배열에 들어있는지 확인하는 로직.
     *
     * @param userId
     * @return
     */
    @Override
    public ResponseEntity<?> check(String userId) throws OpenViduJavaClientException, OpenViduHttpException {
        logger.info("userId :{}", userId);
        User user = userRepository.findByUserId(userId);
        Optional<JoinInfo> opJoinInfo = joinInfoRepository.findByUser(user);

        Long roomId = null;
        if (opJoinInfo.isPresent()) {

            JoinInfo myJoinInfo = opJoinInfo.get();
            roomId = myJoinInfo.getRoom().getRoomId();
            logger.info("myJoinInfo : {}", roomId);
        }

        Map<String, String> body = new HashMap<>();
        body.put("roomId", roomId.toString());


        // 활성화된 방 가져오기.
        Session activeRoom = openvidu.getActiveSession(roomId.toString());
        // 활성화된방이 없으면 만들기
        if(activeRoom==null){
            activeRoom = openvidu.createSession(new SessionProperties.Builder().customSessionId(roomId.toString()).build());
        }
        logger.info("activeRoom : {}",activeRoom);


        return ResponseEntity.status(HttpStatus.OK).body(body);
    }
}
