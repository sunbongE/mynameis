package com.ssafy.myname.db.entity.matching;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@DynamicInsert
public class Room { // 매칭방

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long roomId;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "w_cnt")
    private int Wcnt;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "m_cnt")
    private int Mcnt;

    @CreationTimestamp // insert할때 현재시각 입력. 자동으로..
    @Column(name = "start_date",columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING) // 문자로 값 저장,
    private RoomType roomType;

    @OneToMany(mappedBy = "room",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JoinInfo> joinInfos = new ArrayList<>();




}
