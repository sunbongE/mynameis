package com.ssafy.myname.db.repository;

import com.ssafy.myname.dto.request.chat.ChatRoomDto;

import com.ssafy.myname.service.RedisSubscriber;
import jakarta.annotation.PostConstruct;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.*;
@Slf4j
@Repository
@RequiredArgsConstructor
public class CoupleChatRoomRepository {
    // topic에 발행되는 메시지를 처리할 리스너
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;
    // 레디스
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String,Object> redisTemplate;
    private HashOperations<String,String,ChatRoomDto> opsHashChatRoom;

    // 채팅방의 대화 메시지를 발행하기 위한 redis topic정보, 서버별로 채팅방에
    // 매치되는 topic정보를 Map에 넣어 roomId로 찾을 수 있도록 한다.
    private Map<String, ChannelTopic> topics;

    @PostConstruct
    private void inti(){
        opsHashChatRoom = redisTemplate.opsForHash();
        topics = new HashMap<>();
    }

    // ==================================================
    public List<ChatRoomDto> findAllRoom() {
        return opsHashChatRoom.values(CHAT_ROOMS);
    }
    public ChatRoomDto findRoomById(String coupleId) {
        return opsHashChatRoom.get(CHAT_ROOMS, coupleId);
    }
    // ==================================================

    /**
     * 채팅방 생성.
     * @param coupleId
     * @return
     */
    public ChatRoomDto createChatRoom(String coupleId){
        ChatRoomDto chatRoomDto = ChatRoomDto.create(coupleId);
        opsHashChatRoom.put(CHAT_ROOMS, chatRoomDto.getRoomId(), chatRoomDto);
        return chatRoomDto;
    }

    /**
     * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
     * @param coupleId
     */
    public void enterChatRoom(String coupleId) {
        ChannelTopic topic = topics.get(coupleId);
        if(topic == null){
            topic = new ChannelTopic(coupleId);
            redisMessageListener.addMessageListener(redisSubscriber,topic);
            topics.put(coupleId, topic);
        }
        log.info("topic : {}",topic);
    }

    public ChannelTopic getTopic(String coupleId){
        return topics.get(coupleId);
    }

}