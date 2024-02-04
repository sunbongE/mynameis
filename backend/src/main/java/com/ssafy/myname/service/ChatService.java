package com.ssafy.myname.service;

import com.ssafy.myname.dto.request.chat.ChatDto;

import java.util.List;

public interface ChatService {
    void saveMessage(ChatDto messageDto);

    List<ChatDto> loadMessage(String roomId);
}
