package com.ssafy.myname.db.entity.matching;

import com.ssafy.myname.db.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Getter
@Setter
@Entity
@DynamicInsert
public class JoinInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "join_id")
    private Long joinId;

    @NotNull
    @ColumnDefault("0")
    private int like_cnt;

    // 매칭번호.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    // 회원 기본키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 방 입장토큰
    private String token;

    // 랜덤이름
    private String randomName;

    @Override
    public String toString() {
        return "JoinInfo{" +
                "joinId=" + joinId +
                ", like_cnt=" + like_cnt +
                ", room=" + room +
//                ", user=" + user +
                '}';
    }
}
