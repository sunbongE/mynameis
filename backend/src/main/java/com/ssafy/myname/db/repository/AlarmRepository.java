package com.ssafy.myname.db.repository;

import com.ssafy.myname.db.entity.Alarm;
import com.ssafy.myname.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm,Long> {
    List<Alarm> findAllByReceiver(User receiver);
}
