package com.ssafy.myname.dto.request.matching;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class EnterDto {
    @NotBlank
    private String roomId;
}
