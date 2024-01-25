package com.ssafy.myname.dto.request.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
public class SignUpReqDto  {

    @NotBlank
    private String userId;

    @NotBlank
//    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,13}$")
    private String password;

    @Email
    @NotBlank
    private String email;

    @NotNull
    private String name;

    @NotNull
    private Boolean gender;

    @NotBlank
    @Column(length = 8)
    private String birth;

    @NotBlank
    private String phone;

    @NotBlank
    private String area;

    @NotBlank
    private String job;

    @NotBlank
    private String[] tags;

    @NotBlank
    private String religion ;


}
