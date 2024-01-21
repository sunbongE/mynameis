package com.ssafy.myname.db.entity.Chats;

import com.ssafy.myname.db.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "CHAT_JOIN_INFO")
public class ChatJoinInfo {

    @EmbeddedId
    private ChatJoinInfoKey chatJoinInfoKey;

    @MapsId("chatRoomId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "chatJoinInfo")
    private List<Chat> chats = new ArrayList<>();

}
