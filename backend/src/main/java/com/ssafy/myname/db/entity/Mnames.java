package com.ssafy.myname.db.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Mnames {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 5)
    private String name;
}
