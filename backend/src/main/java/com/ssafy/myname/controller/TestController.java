//package com.ssafy.myname.controller;
//
////import com.ssafy.myname.db.repository.CoupleChatRoomRepository;
//import com.ssafy.myname.db.repository.CoupleChatRoomRepository;
//import com.ssafy.myname.dto.request.chat.ChatRoomDto;
//import com.ssafy.myname.provider.MatchingProvider;
//import lombok.RequiredArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/test")
//@RequiredArgsConstructor
//public class TestController {
//    private final Logger logger = LoggerFactory.getLogger(this.getClass());
//    private final MatchingProvider matchingProvider;
//    private final CoupleChatRoomRepository coupleChatRoomRepository;
//
//
//
//    @GetMapping("/createChatRoom")
//    public ChatRoomDto createChatRoom() {
//        logger.info("** 방만들기 실행.");
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
//
//    @PostMapping("/enter")
//    public ResponseEntity<?> enterRoom(){
//        Map<String,String> res =  new HashMap<>();
//        try {
//            coupleChatRoomRepository.enterChatRoom("12300");
//            res.put("msg","성공");
//
//        }catch (Exception e){
//            res.put("msg","실패");
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(res);
//    }
//}
