package com.ssafy.myname.dto.request.chat;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//@Getter
//@Setter
@Data
public class ChatDto {
    public enum MessageType{
        ENTER, TALK, JOIN
    }
    private MessageType type;   // 메시지 타입
    private String  roomId;        // 방번호
    private String sender;    // 메시지 보낸 사람
    private String msg;         // 메시지

//    private



    public ChatDto(String roomId, String sender, String msg) {
        this.roomId = roomId;
        this.sender = sender;
        this.msg = msg;
    }

    public ChatDto() {
    }
}

