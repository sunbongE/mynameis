package com.ssafy.myname.db.entity.Chats;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ChatJoinInfoKey implements Serializable {

    @Column(name = "chat_room_id")
    private Long chatRoomId;

    @Column(name = "user_id")
    private String userId;

    public ChatJoinInfoKey() {
    }

    public ChatJoinInfoKey(Long chatRoomId, String userId) {
        this.chatRoomId = chatRoomId;
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatJoinInfoKey that = (ChatJoinInfoKey) o;
        return Objects.equals(chatRoomId, that.chatRoomId) && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(chatRoomId, userId);
    }
}