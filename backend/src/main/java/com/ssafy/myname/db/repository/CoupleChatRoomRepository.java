package com.ssafy.myname.db.repository;

import com.ssafy.myname.dto.request.chat.ChatRoomDto;

import jakarta.annotation.PostConstruct;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class CoupleChatRoomRepository {
    private Map<String, ChatRoomDto> chatRoomMap;
    @PostConstruct
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }
    public List<ChatRoomDto> findAllRoom() {
        // 채팅방 생성순서 최근 순으로 반환
        List chatRooms = new ArrayList<>(chatRoomMap.values());
        Collections.reverse(chatRooms);
        return chatRooms;
    }
    public ChatRoomDto findRoomById(String id) {
        return chatRoomMap.get(id);
    }
    public ChatRoomDto createChatRoom(String name) {
        ChatRoomDto chatRoom = ChatRoomDto.create(name);
        chatRoomMap.put(chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }
}