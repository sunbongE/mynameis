package com.ssafy.myname.dto.request.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomDto {
    private String roomId;

    public static ChatRoomDto create(String coupleId) {
        ChatRoomDto chatRoom = new ChatRoomDto();
        chatRoom.roomId =coupleId;
//        chatRoom.name = name;
        return chatRoom;
    }
}