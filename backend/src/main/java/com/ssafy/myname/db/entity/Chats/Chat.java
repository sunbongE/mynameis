package com.ssafy.myname.db.entity.Chats;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "CHAT")
public class Chat {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long chatId; // 보내는 채팅 고유 번호.

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "chat_room_id"),
            @JoinColumn(name = "user_id")
    })
    private ChatJoinInfo chatJoinInfo;

    @Column(name = "regist_date",columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime registDate;

    @Column(name = "is_read")
    private Boolean isRead;

    private String msg;

    @Column(name = "img_path")
    private String imgPath;
}
