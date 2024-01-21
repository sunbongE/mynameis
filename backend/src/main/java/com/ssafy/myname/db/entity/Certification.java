package com.ssafy.myname.db.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Certification {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;
    @NotNull
    @Column(unique = true,nullable = false)
    private String email;
    @NotNull
    private String certification_num;

}
