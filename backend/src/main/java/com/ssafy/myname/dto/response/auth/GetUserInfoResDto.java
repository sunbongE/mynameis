package com.ssafy.myname.dto.response.auth;

import com.ssafy.myname.db.entity.Tags;
import com.ssafy.myname.db.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class GetUserInfoResDto {

    @NotBlank
    private String name;

    private int coin;

    private Boolean gender;

    @NotBlank
    private String birth;

    @NotBlank
    private String area; // 지역.

    @NotBlank
    private String job;

    private List<String> tag = new ArrayList<>();
    @NotBlank
    private String religion; // 종교.

    private Long coupleId;

    private Boolean isValid;

    public void addTags(List<Tags> tagsEntity){
        for (Tags tagEntity : tagsEntity) {
            this.tag.add(tagEntity.getTagName());
        }
    }

    public GetUserInfoResDto(User user) {
        this.name = user.getName();
        this.coin = user.getCoin();
        this.gender = user.getGender();
        this.birth = user.getBirth();
        this.area = user.getArea();
        this.job = user.getJob();

        this.religion = user.getReligion();

        if(user.getCouple() != null){
            this.coupleId = user.getCouple().getCoupleId();
        }else{
            this.coupleId = null;
        }
        this.isValid = user.isValid();
    }
}
