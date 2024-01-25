package com.ssafy.myname.dto.request.auth;

import com.ssafy.myname.db.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
public class TagDto {
    @NotBlank
    private User user;

    @NotBlank
    private String tag;

    public TagDto(User user, String tag) {
        this.user = user;
        this.tag = tag;
    }
}
