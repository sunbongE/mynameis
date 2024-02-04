package com.ssafy.myname.service.implement;

import com.ssafy.myname.dto.request.chat.ChatDto;
import com.ssafy.myname.service.ChatService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ChatServiceImpl implements ChatService {
    @Override
    public void saveMessage(ChatDto messageDto) {

    }

    @Override
    public List<ChatDto> loadMessage(String roomId) {
        return null;
    }
}
