package com.ssafy.myname.service.implement;

import com.ssafy.myname.db.entity.Alarm;
import com.ssafy.myname.db.entity.Couple;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.AlarmRepository;
import com.ssafy.myname.db.repository.CoupleChatRoomRepository;
import com.ssafy.myname.db.repository.CoupleRepository;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.provider.CoupleVideoProvider;
import com.ssafy.myname.service.CoupleService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class CoupleServiceImpl implements CoupleService {
    private final CoupleRepository coupleRepository;
    private final UserRepository userRepository;
    private final AlarmRepository alarmRepository;
    private final CoupleChatRoomRepository coupleChatRoomRepository;
    private final EntityManager em;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public ResponseEntity<?> coupleAccept(User user, Couple couple) {

        try {
            if (user.getGender() == true) { // 남자인상황
                couple.setUserM(user);
            } else { // 여자인 경우.
                couple.setUserW(user);
            }
            coupleRepository.save(couple);

            Map<String, String> body = new HashMap<>();
            // 마지막에 커플 테이블 조회해서 두 회원이 있으면
            if (couple.getUserW() != null && couple.getUserM() != null) {
                // 상태를 변경해준다.isMatched -> true;
                couple.setIsMatched(true);
                coupleRepository.save(couple);

                // 회원들의 CoupleId 변경.
                User men = couple.getUserM();
                User women = couple.getUserW();
                men.setCouple(couple);
                userRepository.save(men);
                women.setCouple(couple);
                userRepository.save(women);

                body.put("msg","커플이 되었습니다.");
                String roomId = String.valueOf(couple.getCoupleId());
                // 커플 채팅방 테이블 생성.
                coupleChatRoomRepository.createChatRoom(roomId);

                return ResponseEntity.status(HttpStatus.OK).body(body);
            }
                body.put("msg","한명이 수락했습니다.");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(body);
        }catch (Exception e){
            Map<String, String> body = new HashMap<>();
            body.put("msg",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
        }
    }

    @Override
    public ResponseEntity<?> deleteCouple(Long coupleId) {
        try {
            coupleRepository.deleteById(coupleId);
            Map<String, String> body = new HashMap<>();
            body.put("msg","커플 데이터 삭제됨");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(body);
        }catch (Exception e){
            logger.info(e.getMessage());
            Map<String, String> body = new HashMap<>();
            body.put("msg",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
        }

    }

    /**
     *
     * @param senderId 이별을 선언한 userId
     * @return
     */
    @Override
    public ResponseEntity<?> breakCouple( String senderId) {
        logger.info("** breakCouple Impl실행");
        User sender = userRepository.findByUserId(senderId);
        Couple couple = sender.getCouple();

        // 알림 받는 사람.
        User receiver = null;
        if(sender.equals(couple.getUserW())){
            receiver = couple.getUserM();
        }else {
            receiver = couple.getUserW();
        }

        sender.setCouple(null);
        userRepository.save(sender);
        receiver.setCouple(null);
        userRepository.save(receiver);
        // 커플 데이터 삭제
        coupleRepository.delete(couple);


        //=== 알림 상대방에게 발송====
        // 여기 작성 예정.
        Alarm alarm = new Alarm();
        alarm.setSender(sender);
        alarm.setReceiver(receiver);
        alarm.setMsg(sender.getName()+"님과 이별하였습니다.");
        alarmRepository.save(alarm);

        // ==========
        Map<String,String> body = new HashMap<>();
        body.put("msg","헤어졌습니다.");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(body);
    }

    @Override
    public ResponseEntity<?> coupleVideo(String userId , String coupleId) throws OpenViduJavaClientException, OpenViduHttpException {
        // 방 만들고 방아이디는 커플 아이디.
        String token = CoupleVideoProvider.coupleVideo(coupleId);
        User user = userRepository.findByUserId(userId);

        // 방 입장토큰을 준다.
        Map<String,String> body = new HashMap<>();
        body.put("videoId",coupleId);
        body.put("token",token);
        body.put("name",user.getName());

         return ResponseEntity.status(HttpStatus.OK).body(body);
    }
}
