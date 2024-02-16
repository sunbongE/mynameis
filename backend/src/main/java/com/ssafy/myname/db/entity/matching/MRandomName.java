package com.ssafy.myname.db.entity.meeting;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "m_random_name")
public class MRandomName {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

}
