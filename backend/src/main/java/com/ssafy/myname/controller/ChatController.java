package com.ssafy.myname.controller;

import com.ssafy.myname.db.repository.CoupleChatRoomRepository;
import com.ssafy.myname.dto.request.chat.ChatDto;
import com.ssafy.myname.dto.request.chat.ChatRoomDto;
//import com.ssafy.myname.service.ChatService;
import com.ssafy.myname.service.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @MessageMapping("/chat/message")
    public void message(ChatDto msg, Principal principal){
        String userId = principal.getName();

        if(ChatDto.MessageType.ENTER.equals(msg.getType())){
            chatRoomRepository.enterChatRoom(msg.getRoomId());
            msg.setMsg(userId+"님이 입장하셨습니다.");
        }
        redisPublisher.publish(chatRoomRepository.getTopic(msg.getRoomId()),msg);
    }

}