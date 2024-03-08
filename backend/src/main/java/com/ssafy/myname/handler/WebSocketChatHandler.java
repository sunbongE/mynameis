package com.ssafy.myname.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.myname.dto.request.chat.ChatDto;
import com.ssafy.myname.dto.request.chat.ChatRoomDto;
import com.ssafy.myname.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketChatHandler extends TextWebSocketHandler  {
    private final Set<WebSocketSession> sessions = new HashSet<>();
    private final ObjectMapper objectMapper;
    private final ChatService chatService;
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);

        System.out.println("새 클라이언트와 연결되었습니다.");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.info("payload {}", payload); // 보낸 메시지 출력됨.
//        TextMessage textMessage = new TextMessage("Welcome chatting sever~^^");
//        session.sendMessage(textMessage);
        ChatDto chatMessage = objectMapper.readValue(payload, ChatDto.class);
        log.info("chatMessage.getRoomId() : {}",chatMessage.getRoomId());
//        ChatRoomDto room = chatService.findRoomById(chatMessage.getRoomId());
//        log.info("room :{} ",room);
//        room.handleActions(session, chatMessage, chatService);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session,
                                      CloseStatus status) {
        sessions.remove(session);

        System.out.println("특정 클라이언트와의 연결이 해제되었습니다.");
    }
}
