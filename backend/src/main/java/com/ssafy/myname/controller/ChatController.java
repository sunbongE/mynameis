package com.ssafy.myname.controller;

import com.ssafy.myname.db.repository.CoupleChatRoomRepository;
import com.ssafy.myname.dto.request.chat.ChatDto;
import com.ssafy.myname.dto.request.chat.ChatRoomDto;
//import com.ssafy.myname.service.ChatService;
import com.ssafy.myname.provider.JwtProvider;
import com.ssafy.myname.service.ChatService;
import com.ssafy.myname.service.RedisPublisher;
import com.ssafy.myname.service.RedisSubscriber;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final JwtProvider jwtProvider;
    private final RedisTemplate<String,Object> redisTemplate;
    @MessageMapping("/chat/message")
    public void messages(ChatDto msg, @Header("Authorization") String token){
        log.info("message 실행");
        String userId = jwtProvider.validate(token.substring(7));

        msg.setSender(userId);

        chatService.sendMessage(msg);
        log.info("레디스로 발행함.");
    }

}