package com.ssafy.myname.dto.request.chat;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ChatRoomDto implements Serializable {

    private static final long serialVersionUID = 6494678977089006639L;

    private String roomId;

    public static ChatRoomDto create(String coupleId) {
        ChatRoomDto chatRoom = new ChatRoomDto();
        chatRoom.roomId =coupleId;
        return chatRoom;
    }
}