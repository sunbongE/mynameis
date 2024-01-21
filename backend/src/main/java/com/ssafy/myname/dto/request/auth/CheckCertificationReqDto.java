package com.ssafy.myname.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CheckCertificationReqDto  {

    @NotBlank
    private String userId ;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String certificationNumber;

}
