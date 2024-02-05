package com.ssafy.myname.dto.request.chat;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class ChatDto {

    private Long roomId;

    @NotBlank
    private String senderId;

    @NotBlank
    private String msg;

//    private



    public ChatDto(Long roomId, String senderId, String msg) {
        this.roomId = roomId;
        this.senderId = senderId;
        this.msg = msg;
    }
}

