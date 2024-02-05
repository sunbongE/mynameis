package com.ssafy.myname.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class ChangeUrlReqDto {

    @NotBlank
    private String userId;
    @NotBlank
    private String email;
}
