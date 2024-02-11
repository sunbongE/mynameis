package com.ssafy.myname.db.entity;

import com.ssafy.myname.db.entity.Chats.ChatJoinInfo;
import com.ssafy.myname.db.entity.meeting.JoinInfo;
import com.ssafy.myname.dto.request.auth.SignUpReqDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "USERS")
@DynamicInsert // Enum default user 적용됨.
public class User {

    @Id
    @Column(name = "user_id", length = 20)
    private String userId;

    private String password;

    @NotNull
    @Column(length = 20)
    private String name;

    @NotNull
    @Column(length = 10)
    private String birth;
    @NotNull
    private Boolean gender;

    @Column(length = 10)
    private String area; // 지역.
    @Column(length = 10)
    private String religion; // 종교.
    @Column(length = 30)
    private String job;

    @NotNull
    @ColumnDefault("0")
    private int coin;

    @CreationTimestamp // insert시 시간저장
    @Column(name = "join_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime joinDate;

    @UpdateTimestamp // update문 적용시 자동으로 현재시간 입력.
    @Column(name = "update_date")
    private LocalDateTime updateDate;

    @ColumnDefault("false")
    @Column(name = "is_leave")
    private boolean isLeave;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'ROLE_USER'")
    private Roles role;

    @Column(length = 11, unique = true)
    private String phone;

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'READY'")
    private MatchStatus matchStatus; // 매칭 여부.

    @NotNull
    @ColumnDefault("0")
    private int reportPoint;

    @Column(length = 50, unique = true)
    @NotNull
    private String email;

    @OneToMany(mappedBy = "receiver")
    private List<Alarm> myAlarms = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Tags> tags = new ArrayList<>();


    @OneToMany(mappedBy = "user")
    private List<ChatJoinInfo> chatJoinInfos;

    // 참여정보 데이터들
    @OneToMany(mappedBy = "user")
    private List<JoinInfo> joinInfos = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "couple_id")
    private Couple couple;

    public User() {
    }

//    public User(SignUpReqDto dto) {
//        this.userId = dto.getUserId();
//        this.password = dto.getPassword();
//        this.name = dto.getName();
//        this.birth = dto.getBirth();
//        this.gender = dto.getGender();
//        this.email = dto.getEmail();
//    }

    public User(SignUpReqDto dto) {
        this.userId = dto.getUserId();
        this.password = dto.getPassword();
        this.name = dto.getName();
        this.birth = dto.getBirth();
        this.gender = dto.getGender();
        this.email = dto.getEmail();
        this.area = dto.getArea();
        this.religion = dto.getReligion();
        this.job = dto.getJob();
        this.phone = dto.getPhone();
        // tag들 저장.
    }
    // 출력


    @Override
    public String toString() {
        return "\'{" +
                "\"userId\":\"" + userId + "\"," +
                "\"password\":\"" + password + "\"," +
                "\"name\":\"" + name + "\"," +
                "\"birth\":\"" + birth + "\"," +
                "\"gender\":" + gender + "," +
                "\"area\":\"" + area + "\"," +
                "\"religion\":\"" + religion + "\"," +
                "\"job\":\"" + job + "\"," +
                "\"coin\":" + coin + "," +
                "\"joinDate\":\"" + joinDate + "\"," +
                "\"updateDate\":\"" + updateDate + "\"," +
                "\"isLeave\":" + isLeave + "," +
                "\"role\":" + role + "," +
                "\"phone\":\"" + phone + "\"," +
                "\"matchStatus\":" + matchStatus + "," +
                "\"reportPoint\":" + reportPoint + "," +
                "\"email\":\"" + email + "\"," +
                "\"myAlarms\":" + myAlarms + "," +
                "\"tags\":" + tags +
                "}\'";
    }
}
