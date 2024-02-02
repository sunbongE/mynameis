package com.ssafy.myname.openvidu.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeetingDto {
    private String sessionId;
    private int cnt;
    private LocalDateTime meetingRegisterTime;}
