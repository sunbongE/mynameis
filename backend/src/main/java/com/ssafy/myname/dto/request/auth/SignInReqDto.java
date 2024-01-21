package com.ssafy.myname.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignInReqDto {

    @NotBlank
    private String userId;
    @NotBlank
    private String password;
}
