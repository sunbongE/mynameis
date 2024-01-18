package com.ssafy.myname.db.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "COUPLE")
public class Couple {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "couple_id")
    private Long coupleId;

    @CreationTimestamp
    @Column(name = "matching_date")
    private LocalDateTime matchingDate;

    @OneToMany(mappedBy = "couple")
    private List<User> users = new ArrayList<>();
}
