package com.ssafy.myname.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Wnames {

    @Id
    @GeneratedValue
    @Column(length = 5)
    private String name;
}
