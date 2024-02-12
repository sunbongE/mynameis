package com.ssafy.myname.controller;

import com.ssafy.myname.db.entity.Couple;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.CoupleRepository;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.request.couple.CoupleAcceptRequest;
import com.ssafy.myname.dto.request.couple.CoupleVideoDto;
import com.ssafy.myname.service.CoupleService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/couple")
@RequiredArgsConstructor
public class CoupleController {

    private final CoupleRepository coupleRepository;
    private final UserRepository userRepository;
    private final CoupleService coupleService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @PostMapping("/create")
    public ResponseEntity<?> createCoupleTBL() {
        logger.info("** createCoupleTBL 실행.");
        try {
            Couple couple = new Couple();
            couple = coupleRepository.save(couple);
            Map<String, Object> body = new HashMap<>();
            body.put("coupleId", couple.getCoupleId());
            return ResponseEntity.status(HttpStatus.OK).body(body);

        } catch (Exception e) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "can not create coupleTBL");
            errorBody.put("message", e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }

    /**
     * @param principal 회원 식별
     * @param request   coupleId : 커플테이블 식별자, answer : true수락, false: 거절
     * @return 커플이 성사 여부를 반환합니다.
     */
    @PostMapping("/accept")
    public ResponseEntity<?> coupleAccept(Principal principal, @RequestBody CoupleAcceptRequest request) {
        logger.info("** coupleAccept 호출");

        Long coupleId = request.getCoupleId();

        // 커플 목록이 존재하는지 확인
        Optional<Couple> opCouple = coupleRepository.findById(coupleId);
        // 커플 목록에 없으면 한명이라도 거절을 한 상태입니다.
        if (opCouple.isEmpty()) {
            Map<String, String> body = new HashMap<>();
            body.put("msg", "커플이 이뤄지지 않음");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(body); // 204
        }

        // 커플 수락한 경우.
        if (request.getAnswer()) {
            String userId = principal.getName();

            // 회원정보 불러오기
            User user = userRepository.findByUserId(userId);
            // 성별에 따라 테이블에 저장하기.
            Couple couple = opCouple.get();
            try {
                ResponseEntity<?> response = coupleService.coupleAccept(user, couple);
                return response;

            } catch (Exception e) {
                Map<String, String> body = new HashMap<>();
                logger.info(e.getMessage());
                body.put("msg", "커플은 한 쌍만 가능합니다.");
                body.put("error", e.getMessage());

                return ResponseEntity.badRequest().body(body);
            }

        } else { // 커플이 거절된 경우.
            // 커플아이디로 커플 데이터 삭제.
            ResponseEntity<?> response = coupleService.deleteCouple(coupleId);

            return response;
        }
    }

    /**
     * 커플데이터를 삭제한 후 이별통보를 받는 회원에게
     * 알림을 보내고 로직이 종료됩니다.
     *
     * @param principal 이별요청한 회원 식별
     * @return
     */
    @DeleteMapping("/break-up")
    public ResponseEntity<?> breakUp(Principal principal) {
        try {

            String userId = principal.getName();


            // 서비스에서 couple데이터 삭제 후 알림 발송
            ResponseEntity<?> response = coupleService.breakCouple(userId);


            return response;

        } catch (Exception e) {
            logger.info(e.getMessage());
            Map<String, String> body = new HashMap<>();
            body.put("msg", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
        }
    }

    @GetMapping("/video")
    public ResponseEntity<?> coupleVideo(Principal principal ,@RequestParam("coupleId") String coupleId) {
        logger.info("** coupleVideo 호출");
        logger.info("dto :{}", coupleId);
        try {
            String userId = principal.getName();
            ResponseEntity<?> response = coupleService.coupleVideo(userId,coupleId);

            return response;

        } catch (Exception e) {
            logger.info(e.getMessage());
            Map<String, String> body = new HashMap<>();
            body.put("msg", e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
        }
    }
}
