package com.ssafy.myname.db.entity.Chats;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ChatJoinInfoKey implements Serializable {

    @Column(name = "chat_room_id")
    private Long chatRoomId;

    @Column(name = "user_pk")
    private Long userPk;

    public ChatJoinInfoKey() {
    }

    public ChatJoinInfoKey(Long chatRoomId, Long userPk) {
        this.chatRoomId = chatRoomId;
        this.userPk = userPk;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatJoinInfoKey chatJoinInfoKey = (ChatJoinInfoKey) o;
        return Objects.equals(chatRoomId, chatJoinInfoKey.chatRoomId) && Objects.equals(userPk, chatJoinInfoKey.userPk);
    }

    @Override
    public int hashCode() {
        return Objects.hash(chatRoomId, userPk);
    }
}
