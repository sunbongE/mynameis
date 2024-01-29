package com.ssafy.myname.db.repository;

import com.ssafy.myname.db.entity.Couple;
import com.ssafy.myname.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoupleRepository extends JpaRepository<Couple,Long> {
//    Couple findBYCoupleId(Long coupleId);
}
