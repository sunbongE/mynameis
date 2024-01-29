package com.ssafy.myname.db.entity;


import com.ssafy.myname.dto.request.auth.TagDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "TAG")
public class Tags {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long tagId;

    @NotNull
    @Column(name = "tag_name", length = 45)
    private String tagName;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Tags() {
    }

    public Tags(User user, String tag) {
        this.user = user;
        this.tagName = tag;
    }

}
