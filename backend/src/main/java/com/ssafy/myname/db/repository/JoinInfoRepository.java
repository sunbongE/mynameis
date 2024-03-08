package com.ssafy.myname.db.repository;

import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.entity.meeting.JoinInfo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JoinInfoRepository extends JpaRepository<JoinInfo,Long> {

    Optional<JoinInfo> findByUser(User user);
    void deleteByUser(User user);

}
