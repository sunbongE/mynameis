package com.ssafy.myname.db.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomId;
    private String reportedId;
    private String reportType;
    private String timeStamp;
    @PrePersist
    public void prePersist() {
        this.timeStamp = String.valueOf(System.currentTimeMillis());
    }
}
