package com.ssafy.myname.dto.request.couple;

import lombok.Getter;

@Getter
public class CoupleVideoDto {
    private Long coupleId;

    @Override
    public String toString() {
        return coupleId+"";

    }
}
