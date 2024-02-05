//package com.ssafy.myname.controller;
//
////import com.ssafy.myname.db.repository.CoupleChatRoomRepository;
//import com.ssafy.myname.dto.request.chat.ChatRoomDto;
//import com.ssafy.myname.provider.MatchingProvider;
//import lombok.RequiredArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/test")
//@RequiredArgsConstructor
//public class TestController {
//    private final Logger logger = LoggerFactory.getLogger(this.getClass());
//    private final MatchingProvider matchingProvider;
////    private final CoupleChatRoomRepository coupleChatRoomRepository;
//
//    @GetMapping("/getRandomNames")
//    public ResponseEntity<?> getRandomName() {
//        List<String> man = matchingProvider.randomNames(2, true);
//        List<String> woman = matchingProvider.randomNames(2, false);
//        logger.info("man : {}", man);
//        logger.info("woman : {}", woman);
//        return null;
//    }
//
//    @GetMapping("/createChatRoom")
//    public ChatRoomDto createChatRoom() {
//
//        try {
//            ChatRoomDto chatRoom = coupleChatRoomRepository.createChatRoom("12300");
////            ChatRoomDto chatRoom2 = coupleChatRoomRepository.createChatRoom("xogh");
//            return coupleChatRoomRepository.findRoomById("12300");
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return null;
//    }
//}
