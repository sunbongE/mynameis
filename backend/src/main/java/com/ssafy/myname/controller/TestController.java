package com.ssafy.myname.controller;

//import com.ssafy.myname.db.repository.CoupleChatRoomRepository;
import com.ssafy.myname.db.repository.CoupleChatRoomRepository;
import com.ssafy.myname.dto.request.chat.ChatRoomDto;
import com.ssafy.myname.provider.MatchingProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final CoupleChatRoomRepository coupleChatRoomRepository;



    @GetMapping("/createTopic")
    public ChatRoomDto createChatRoom() {
        logger.info("** 방만들기 실행.");
        try {
            ChatRoomDto chatRoom = coupleChatRoomRepository.createChatRoom("1");
            return coupleChatRoomRepository.findRoomById("1");

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}
