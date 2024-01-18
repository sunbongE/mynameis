package com.ssafy.myname.db.entity.matching;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter @Setter @Entity
public class Record {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @CreationTimestamp
    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String filePath;
}
