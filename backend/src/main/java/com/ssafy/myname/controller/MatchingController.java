//package com.ssafy.myname.controller;
//
//import com.ssafy.myname.db.entity.User;
//import com.ssafy.myname.db.repository.RoomRepository;
//import com.ssafy.myname.db.repository.UserRepository;
//import com.ssafy.myname.dto.request.matching.EnterDto;
//import com.ssafy.myname.dto.request.matching.MatchRequestDto;
//import com.ssafy.myname.dto.response.matching.MatchingAcceptResponseDto;
//import com.ssafy.myname.provider.MatchingProvider;
//import com.ssafy.myname.provider.QuestionProvider;
//import com.ssafy.myname.service.MatchingService;
//import com.ssafy.myname.service.implement.MatchingServiceImpl;
//import lombok.RequiredArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.security.Principal;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/matching")
//@RequiredArgsConstructor
//public class MatchingController {
//    private final MatchingService matchingService;
//    private final MatchingProvider matchingProvider;
//    private final QuestionProvider questionProvider;
//
//    private final Logger logger = LoggerFactory.getLogger(this.getClass());
//
//    /**
//     * 사용자가 매칭요청을 하면 매칭 프로바이더의 큐 안으로 들어가게 되어 대기 상태가된다.
//     * 사용자의 속성중 setMatchStatus를 Matching으로 변경해준다.
//     *
//     * @param principal
//     * @return
//     */
//    @PostMapping("/join")
//    public ResponseEntity<?> matchingJoin(Principal principal, @RequestBody MatchRequestDto dto) throws InterruptedException {
//        logger.info("dto : {}",dto);
//        logger.info("** 매칭 요청 실행 타입 :{}",dto.getType());
//        String userId = principal.getName();
//        String type = dto.getType();
//        try {
//            if (type.equals("two")) {
//                ResponseEntity<?> response = matchingService.twoMatchingJoin(userId);
//                // 매칭이 모두 잡혔는지 확인해보자.
//
//                if(matchingProvider.check(type)){
//
//                    // 여기서 DB생성.
//                    matchingProvider.createRoom(type);
//
//                }
//                return response;
//            } else {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("아직 구현 안했어요.");
//            }
//        } catch (Exception e) {
//            logger.info(e.getMessage());
//            logger.info("======================");
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(MatchingAcceptResponseDto.fail());
//        }
//    }
//
//    @PostMapping("/cancle")
//    public ResponseEntity<?> matchingCancle(Principal principal) {
//            String userId = principal.getName();
//        try {
//            ResponseEntity<?> response = matchingService.matchingCancle(userId);
//            return response;
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(MatchingAcceptResponseDto.fail());
//        }
//    }
//
//    /**
//     * 사용자가 내가 매칭이 잡혔는지 확인하는 요청을 보낸것.
//     * 성공 : 방번호, 랜덤이름, 회원 정보, 토큰을 준다.
//     * 실패 : 대기안내.
//     * @param principal
//     * @return
//     */
//    @GetMapping("/check")
//    private ResponseEntity<?> check(Principal principal) {
//        String userId = principal.getName();
//        try{
//            ResponseEntity<?> response = matchingService.check(userId);
//            return response;
//
//        }catch (Exception e){
//            Map<String,String> body = new HashMap<>();
//            body.put("msg",e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
//        }
//    }
//
//    @GetMapping("/questions")
//    public ResponseEntity<?> getQuestions(){
//        try {
//            List<String> questions = questionProvider.getRandomQuestions();
//            Map<String,String> body = new HashMap<>();
//            body.put("questions", questions.toString());
//            return ResponseEntity.status(HttpStatus.OK).body(body);
//        }catch (Exception e){
//            Map<String,String> body = new HashMap<>();
//            body.put("msg",e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
//        }
//    }
//
//    /**
//     * 회원이 들어왔다는 것을 받는다.
//     * 남여 구분하여 Room데이터의 mCnt, wCnt 증가시킨다.
//     * @param dto roomId
//     */
//    @PostMapping("/enter")
//    private void enterMeeting(Principal principal, @RequestBody EnterDto dto){
//
//        try {
//            matchingService.enterMeeting(principal, dto);
//        }catch (Exception e){
//            logger.info(e.getMessage());
//        }
//
//    }
//
//    @PostMapping("/exit")
//    private void exitMeeting(Principal principal, @RequestBody EnterDto dto){
//        logger.info("** exitMeeting 실행");
//        try {
//            matchingService.exitMeeting(principal, dto);
//        }catch (Exception e){
//            logger.info(e.getMessage());
//        }
//
//    }
//}
