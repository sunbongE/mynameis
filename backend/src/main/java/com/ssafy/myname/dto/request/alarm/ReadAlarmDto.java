package com.ssafy.myname.dto.request.alarm;

import lombok.Getter;

import java.util.List;

@Getter
public class ReadAlarmDto {
    private List<Long> alarmsId;
}
