package com.ssafy.myname.db.entity.matching;

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
    private String question; // 질문
}
