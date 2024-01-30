package com.ssafy.myname.service.implement;

import com.ssafy.myname.db.entity.Couple;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.CoupleRepository;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.service.CoupleService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class CoupleServiceImpl implements CoupleService {
    private final CoupleRepository coupleRepository;
    private final UserRepository userRepository;
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
     * @param couple 커플 엔터티
     * @param sender 이별을 선언한 userId
     * @return
     */
    @Override
    public ResponseEntity<?> breakCouple(Couple couple, User sender) {
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
        // ==========
        Map<String,String> body = new HashMap<>();
        body.put("msg","헤어졌습니다.");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(body);
    }
}
