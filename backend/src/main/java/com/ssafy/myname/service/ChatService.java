//package com.ssafy.myname.service;
//
//import com.ssafy.myname.dto.request.chat.ChatDto;
//import com.ssafy.myname.dto.request.chat.ChatRoomDto;
//import org.springframework.web.socket.WebSocketSession;
//
//import java.util.List;
//
//public interface ChatService {
//    ChatRoomDto findRoomById(String coupleId);
//    List<ChatRoomDto> findAllRoom();
//    void saveMessage(ChatDto messageDto);
//    ChatRoomDto createRoom(String coupleId);
//    List<ChatDto> loadMessage(String roomId);
//    <T> void sendMessage(WebSocketSession session, T message);
//}
