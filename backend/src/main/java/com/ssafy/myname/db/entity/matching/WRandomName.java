package com.ssafy.myname.db.entity.meeting;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "w_random_name")
public class WRandomName {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

}
