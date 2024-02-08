package com.ssafy.myname.db.repository;

import com.ssafy.myname.dto.request.chat.ChatDto;
import com.ssafy.myname.dto.request.chat.ChatRoomDto;


import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.connection.Message;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
@Slf4j
@Service
@RequiredArgsConstructor
public class CoupleChatRoomRepository {
    // Redis
    private static final String CHAT_ROOMS = "CHAT_ROOM";// 채팅룸 저장
    public static final String ENTER_INFO = "ENTER_INFO"; // 채팅룸에 입장한 클라이언트의 sessionId와 채팅룸 id를 맵핑한 정보 저장
    @Resource(name = "redisTemplate")
    private HashOperations<String, String, ChatRoomDto> hashOpsChatRoom;
    @Resource(name = "redisTemplate")
    private HashOperations<String, String, String> hashOpsEnterInfo;
    @Resource(name = "redisTemplate")
    private ValueOperations<String, String> valueOps;

    @Resource(name = "redisTemplate")
    private ListOperations<String, ChatDto> listOps;

    private final RedisTemplate<String,ChatDto> redisTemplateMessage;


    public void saveMessage(ChatDto dto){
        // 현재 날짜와 시간을 가져옴
        LocalDateTime now = LocalDateTime.now();

        // 포맷 지정
        DateTimeFormatter dateF = DateTimeFormatter.ofPattern("yyyy년 M월 d일");
        DateTimeFormatter timeF = DateTimeFormatter.ofPattern("HH:mm");

        // 날짜와 시간을 문자열로 변환
        String nowDate = now.format(dateF);
        String nowTime = now.format(timeF);
        dto.setTime(nowTime);
        dto.setDate(nowDate);
        listOps.leftPush(dto.getRoomId(),dto);
    }

    public List<ChatDto> loadMessage(String roomId){
        redisTemplateMessage.setValueSerializer(new Jackson2JsonRedisSerializer<>(ChatDto.class));

        return redisTemplateMessage.opsForList().range(roomId,0,49);
    }

    // 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
    public ChatRoomDto createChatRoom(String name) {
        ChatRoomDto chatRoom = ChatRoomDto.create(name);
        hashOpsChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }

    // 유저가 입장한 채팅방ID와 유저 세션ID 맵핑 정보 저장
    public void setUserEnterInfo(String sessionId, String roomId) {
        hashOpsEnterInfo.put(ENTER_INFO, sessionId, roomId);
    }
    // 유저 세션정보와 맵핑된 채팅방ID 삭제
    public void removeUserEnterInfo(String sessionId) {
        hashOpsEnterInfo.delete(ENTER_INFO, sessionId);
    }

    // 유저 세션으로 입장해 있는 채팅방 ID 조회
    public String getUserEnterRoomId(String sessionId) {
        return hashOpsEnterInfo.get(ENTER_INFO, sessionId);
    }
}