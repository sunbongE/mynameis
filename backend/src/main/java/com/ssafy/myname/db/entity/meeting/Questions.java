package com.ssafy.myname.db.entity.meeting;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
public class Questions {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private int questionId; // 식별자.

    @NotNull
    @Column(name = "contents")
    private String contents; // 질문
}
