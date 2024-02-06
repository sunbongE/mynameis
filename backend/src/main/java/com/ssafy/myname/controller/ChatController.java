package com.ssafy.myname.controller;

import com.ssafy.myname.db.repository.CoupleChatRoomRepository;
import com.ssafy.myname.dto.request.chat.ChatDto;
import com.ssafy.myname.dto.request.chat.ChatRoomDto;
//import com.ssafy.myname.service.ChatService;
import com.ssafy.myname.service.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final CoupleChatRoomRepository chatRoomRepository;
    private final RedisTemplate redisTemplate;

    @MessageMapping("/chat/message")
    public void message(ChatDto msg, Principal principal){
        String userId = principal.getName();
        log.info("message 실행");

        msg.setSender(userId);
        if(ChatDto.MessageType.ENTER.equals(msg.getType())){
            msg.setSender("[알림]");
            msg.setMsg(userId + "님이 입장하셨습니다.");
        }
        // Websocket에 발행된 메시지를 redis로 발행(publish)
        redisTemplate.convertAndSend(msg.getRoomId(), msg);
        log.info("레디스로 발행함.");
    }

}