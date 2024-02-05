package com.ssafy.myname.controller;

import com.ssafy.myname.dto.request.chat.ChatDto;
import com.ssafy.myname.dto.request.chat.ChatRoomDto;
//import com.ssafy.myname.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final SimpMessageSendingOperations messageSendingOperations;

    @MessageMapping("/chat/message")
    public void message(ChatDto msg){
        if(ChatDto.MessageType.JOIN.equals(msg.getType())){
            msg.setMsg(msg.getSender()+"님이 입장하셨습니다.");
        }
        messageSendingOperations.convertAndSend("/sub/chat/room/"+msg.getRoomId(),msg);
    }

}