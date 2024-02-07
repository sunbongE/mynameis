package com.ssafy.myname.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.myname.dto.request.chat.ChatDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener{		// 1.
    private final ObjectMapper objectMapper;
    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    /**
     * Redis에서 메시지가 발행(publish)되면 대기하고 있던 Redis Subscriber가 해당 메시지를 받아 처리한다.
     */

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            // ChatMessage 객채로 맵핑
            String pubMessage = redisTemplate.getStringSerializer().deserialize(message.getBody());
            ChatDto chatMessage = objectMapper.readValue(pubMessage, ChatDto.class);
            log.info("섭스크라이버 실행?");
            log.info("아이디 : {}, 메시지 : {}", chatMessage.getRoomId(), chatMessage.getMsg());

            // 채팅방을 구독한 클라이언트에게 메시지 발송
            messagingTemplate.convertAndSend("/sub/chat/" + chatMessage.getRoomId(), chatMessage);
        } catch (Exception e) {
            log.error("Exception {}", e);
        }
    }
}