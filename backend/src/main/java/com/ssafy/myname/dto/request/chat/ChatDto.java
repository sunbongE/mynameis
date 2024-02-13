package com.ssafy.myname.dto.request.chat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Data
//@Getter
public class ChatDto implements Serializable {

    private String type;            // 메시지 타입
    private String  roomId;         // 방번호
    private String sender;          // 메시지 보낸 사람
    private String msg;             // 메시지
    private String date;            // 0000년 0월 0일
    private String time;            // 10:35

    public ChatDto(String roomId, String sender, String msg) {
        this.roomId = roomId;
        this.sender = sender;
        this.msg = msg;
    }

    public ChatDto() {
    }
}

