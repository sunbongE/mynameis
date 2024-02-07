package com.ssafy.myname.service.implement;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.myname.db.repository.CoupleChatRoomRepository;
import com.ssafy.myname.dto.request.chat.ChatDto;
import com.ssafy.myname.dto.request.chat.ChatRoomDto;
import com.ssafy.myname.service.ChatService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {

    private final ChannelTopic channelTopic;
    private final RedisTemplate redisTemplate;
    private final CoupleChatRoomRepository chatRoomRepository;


    @Override
    public void saveMessage(ChatDto messageDto) {

    }



    @Override
    public List<ChatDto> loadMessage(String roomId) {
        return null;
    }

    @Override
    public <T> void sendMessage(ChatDto dto) {
        if (ChatDto.MessageType.ENTER.equals(dto.getType())) {
            dto.setMsg(dto.getSender() + "님이 방에 입장했습니다.");
            dto.setSender("[알림]");
        } else if (ChatDto.MessageType.QUIT.equals(dto.getType())) {
            dto.setMsg(dto.getSender() + "님이 방에서 나갔습니다.");
            dto.setSender("[알림]");
        }
        redisTemplate.convertAndSend(channelTopic.getTopic(), dto);
    }

    @Override
    public String getRoom(String destination) {
        log.info("destination : {}",destination);
        int lastIndex = destination.lastIndexOf('/');
        if (lastIndex != -1)
            return destination.substring(lastIndex + 1);
        else
            return "";
    }
}