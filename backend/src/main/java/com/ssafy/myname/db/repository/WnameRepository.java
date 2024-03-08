package com.ssafy.myname.db.repository;

import com.ssafy.myname.db.entity.meeting.WRandomName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WnameRepository extends JpaRepository<WRandomName, Integer> {
}
