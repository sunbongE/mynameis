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
    @Column(name = "matching_date",columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime matchingDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_w")
    private User userW;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_m")
    private User userM;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isMatched;

    public Couple() {
    }
}
