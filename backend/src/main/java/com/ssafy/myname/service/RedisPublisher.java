//package com.ssafy.myname.service;
//
//import com.ssafy.myname.dto.request.chat.ChatDto;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.listener.ChannelTopic;
//import org.springframework.stereotype.Service;
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class RedisPublisher {
//    private final RedisTemplate<String, Object> redisTemplate;
//
//    /**
//     *  채팅방에 입장하여 메시지를 작성하면 해당 메시지를 레디스 토픽에 발행하는 기능의 서비스입니다.
//     *  이 서비스를 통해 메시지를 발행하면 대기하던 redis구독 서비스가 메시지를 처리합니다.
//      * @param topic
//     * @param message
//     */
//    public void publish(ChannelTopic topic, ChatDto message) {
//        log.info("** publish 실행되나?");
//        redisTemplate.convertAndSend(topic.getTopic(), message);
//    }
//}