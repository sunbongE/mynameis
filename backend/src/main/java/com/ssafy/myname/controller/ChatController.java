package com.ssafy.myname.controller;

import com.ssafy.myname.dto.request.chat.ChatDto;
import com.ssafy.myname.service.ChatRoomService;
import com.ssafy.myname.service.ChatService;
//import com.ssafy.myname.service.RedisPublisher;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {
//    private final RedisPublisher redisPublisher;
    private final ChatRoomService chatRoomService;
    private final ChatService chatService;

    // 대화 & 대화 저장
    @MessageMapping("/message")
    public void message(ChatDto chatDto) {
        // 클라이언트의 topic  입장, 대화를 위해 리스너와 연동
        chatRoomService.enterMessageRoom(chatDto.getRoomId());

        // Websocket 에 발행된 메시지를 redis 로 발행. 해당 쪽지방을 구독한 클라이언트에게 메시지가 실시간 전송됨 (1:N, 1:1 에서 사용 가능)
//        redisPublisher.publish(chatRoomService.getTopic(chatDto.getRoomId()), chatDto);

        // DB & Redis 에 대화 저장
        chatService.saveMessage(chatDto);
    }

    // 대화 내역 조회
    @GetMapping("/api/room/{roomId}/message")
    public ResponseEntity<List<ChatDto>> loadMessage(@PathVariable String roomId) {
        return ResponseEntity.ok(chatService.loadMessage(roomId));
    }
}