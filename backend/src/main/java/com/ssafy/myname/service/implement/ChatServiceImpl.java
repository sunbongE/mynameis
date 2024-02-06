//package com.ssafy.myname.service.implement;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.ssafy.myname.dto.request.chat.ChatDto;
//import com.ssafy.myname.dto.request.chat.ChatRoomDto;
//import com.ssafy.myname.service.ChatService;
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//import org.springframework.web.socket.TextMessage;
//import org.springframework.web.socket.WebSocketSession;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.LinkedHashMap;
//import java.util.List;
//import java.util.Map;
//
//@Slf4j
//@RequiredArgsConstructor
//@Service
//public class ChatServiceImpl implements ChatService {
//
//    private final ObjectMapper objectMapper;
//    private Map<String, ChatRoomDto> chatRooms;
//
//    @PostConstruct
//    private void init() {
//        chatRooms = new LinkedHashMap<>();
//    }
//
//    public List<ChatRoomDto> findAllRoom() {
//        return new ArrayList<>(chatRooms.values());
//    }
//
//    @Override
//    public ChatRoomDto findRoomById(String coupleId) {
//        return chatRooms.get(coupleId);
//    }
//
//    @Override
//    public ChatRoomDto createRoom(String coupleId) {
//        String roomId = String.valueOf(coupleId);
//        ChatRoomDto chatRoomDto = new ChatRoomDto();
//        chatRoomDto.setRoomId(coupleId);
//        chatRooms.put(roomId, chatRoomDto);
//        return chatRoomDto;
//    }
//
//    @Override
//    public void saveMessage(ChatDto messageDto) {
//
//    }
//
//
//
//    @Override
//    public List<ChatDto> loadMessage(String roomId) {
//        return null;
//    }
//
//    @Override
//    public <T> void sendMessage(WebSocketSession session, T message) {
//        try {
//            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
//        } catch (IOException e) {
//            log.error(e.getMessage(), e);
//        }
//    }
//}