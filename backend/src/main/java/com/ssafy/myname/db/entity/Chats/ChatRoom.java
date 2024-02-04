package com.ssafy.myname.db.entity.Chats;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "CHAT_ROOM")
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long chatRoomId;

    private String title;
    private String content;

    @Column(name = "create_date",columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private LocalDateTime createDate;

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatJoinInfo> chatJoinInfo;



}
